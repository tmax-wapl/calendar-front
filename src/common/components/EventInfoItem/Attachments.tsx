import React, { useRef, ChangeEvent, useContext } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useRoomStore } from '@wapl/core';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { AttachmentInfo, UploadFileDTO, Extension, SyncFileDTOMsg } from '@/common/constants/interfaces';
import { Icon } from '@wapl/ui';
import {
  Accordion,
  AccordionSummary,
  AttachmentsCount,
  AccordionDetails,
  StyledAttachment,
  LoadingAttachment,
  AttachmentPlaceholder,
} from './Attachments.style';
import { APP_ID } from '@/common/constants';

interface Props {
  isUploading?: boolean;
  setUploading?: React.Dispatch<React.SetStateAction<boolean>>;
  attachments?: AttachmentInfo[];
  onFileUpload?: (value: AttachmentInfo[]) => void;
  onFileDelete?: (id: number) => void;
  editable?: boolean;
}

const Attachments = ({
  attachments = [],
  onFileUpload,
  onFileDelete,
  editable = false,
  isUploading,
  setUploading,
}: Props) => {
  const { userId } = useContext(CalendarContext);
  const roomStore = useRoomStore();
  const { fileStore, uiStore } = useCalendarStores();
  const uploadRef = useRef<HTMLInputElement>(null);

  const ExpandIcon = (): JSX.Element => {
    if (editable) return <Icon.Add2Line width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#bdbdbd" width={20} height={20} />;
  };

  const checkValid = (fileList: File[], attachments: AttachmentInfo[]) => {
    const LIMIT = 20 * 1024 ** 3; // 20GB
    const TOTAL_LIMIT = 100 * 1024 ** 3; // 100GB
    if (fileList.length > 30) {
      return { valid: false, reason: 'selectedFileCount' };
    }
    if (fileList.reduce((a, b) => a + b.size, 0) > LIMIT) {
      return { valid: false, reason: 'selectedFileSize' };
    }
    if (fileList.reduce((a, b) => a + b.size, 0) + attachments.reduce((a, b) => a + b.fileSize, 0) > TOTAL_LIMIT) {
      return { valid: false, reason: 'totalFileSize' };
    }
    return { valid: true, reason: '' };
  };

  const checkExtension = (extension: string): Extension => {
    if (['jpg', 'pdf', 'wav', 'xlsx', 'mk4', 'pptx', 'word', 'zip', 'etc'].includes(extension))
      return extension as Extension;
    return 'etc';
  };

  const handleAttach = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files);
    if (fileList) {
      const { valid, reason } = checkValid(fileList, attachments);
      if (valid) {
        const roomId = roomStore.myRoom.id;

        fileList.map(async file => {
          try {
            setUploading(prev => !prev);
            const dto: UploadFileDTO = {
              roomId,
              targetFolderId: null,
              userIds: [String(userId)],
              roleIds: [5],
              fileSize: file.size,
            };
            const tempId = Math.random().toString(36).substring(2, 16);
            await fileStore.uploadFile(file, dto, tempId).then(value => {
              setUploading(prev => !prev);
              if (value)
                onFileUpload([
                  {
                    docsFileId: value.documentId,
                    fileName: value.documentName,
                    fileSize: value.documentSize,
                    fileExtension: value.documentExtension,
                  },
                ]);
              const SyncFileDTOMsg: SyncFileDTOMsg = {
                type: 0,
                objectId: [JSON.stringify(value)],
                objectType: 1,
                producerId: 'waplcalendar',
              };
              fileStore.syncOfficeFile({
                appIdFrom: APP_ID.CALENDAR.toString(),
                appIdTo: [APP_ID.OFFICE.toString()],
                eventId: 'superdocs',
                eventType: 'websocket_push',
                roomId: roomId.toString(),
                senderId: 'waplcalendar',
                message: JSON.stringify(SyncFileDTOMsg),
              });
            });
          } catch (e) {
            setUploading(prev => !prev);
            Array.from(fileStore.uploadInfo.values()).map(info => info.cancelSource.cancel());
            return;
          }
        });
      } else {
        uiStore.setDialogInfo({
          action: reason,
          onClick: [() => uiStore.setDialogInfo(null)],
        });
      }
      e.target.value = '';
    }
  };

  const handleAttachmentClick = () => {
    const roomId = roomStore.myRoom.id;
    window.parent.postMessage({
      type: 'shell:runTopping',
      appId: APP_ID.OFFICE,
      options: {
        runToppingType: 2,
        roomId,
      },
    });
  };

  const handleDeleteClick = async (deleteId: number) => {
    const res = await fileStore.deleteFile({
      location: 0,
      objectList: [{ objectId: deleteId, deleted: 1, actionId: 202 }],
      userId: String(userId),
    });
    if (res === 200) {
      onFileDelete(deleteId);
    }
  };

  const getByteSize = (bytes: number) => {
    if (bytes == 0) return '0 Bytes';
    const k = 1024,
      dm = 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  };

  return (
    <Accordion disableGutters elevation={0} defaultExpanded={!!attachments?.length} expanded={editable || undefined}>
      <AccordionSummary expandIcon={<ExpandIcon />} {...(editable && { onClick: () => uploadRef?.current?.click() })}>
        <Icon.AttachLine className="mr-8" width={20} height={20} />
        첨부파일
        {!editable && <AttachmentsCount>&nbsp;{attachments.length}</AttachmentsCount>}
      </AccordionSummary>
      <AccordionDetails>
        {attachments?.length ? (
          attachments.map(attachment => (
            <StyledAttachment
              key={attachment.docsFileId}
              label={`${attachment.fileName ? attachment.fileName : ''}${
                attachment.fileExtension ? `.${attachment.fileExtension}` : ''
              }`}
              type={checkExtension(attachment.fileExtension)}
              size="medium"
              volume={getByteSize(attachment.fileSize)}
              isMine={editable}
              onDelete={() => handleDeleteClick(attachment.docsFileId)}
              {...(!editable && { onClick: () => handleAttachmentClick() })}
            />
          ))
        ) : (
          <></>
          // <AttachmentPlaceholder>마우스로 파일을 끌어올 수 있습니다.</AttachmentPlaceholder>
        )}
        {isUploading ? (
          <LoadingAttachment>
            <Icon.LoadingMotion />
          </LoadingAttachment>
        ) : null}
      </AccordionDetails>
      <input type="file" ref={uploadRef} style={{ display: 'none' }} onChange={handleAttach} multiple />
    </Accordion>
  );
};

// export default React.memo(Attachments, (prev, next) => prev.attachments === next.attachments);
export default Attachments;
