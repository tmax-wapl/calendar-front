import React, { useRef, ChangeEvent, useContext } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useRoomStore } from '@wapl/core';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { AttachmentInfo, UploadFileDTO, Extension } from '@/common/constants/interfaces';
import { Icon } from '@wapl/ui';
import {
  Accordion,
  AccordionSummary,
  AttachmentsCount,
  AccordionDetails,
  StyledAttachment,
  AttachmentPlaceholder,
} from './Attachments.style';

interface Props {
  isUploading?: boolean;
  setUploading?: React.Dispatch<React.SetStateAction<boolean>>;
  attachments?: AttachmentInfo[];
  onChange?: (value: AttachmentInfo[]) => void;
  editable?: boolean;
}

const Attachments = ({ attachments = [], onChange, editable = false, isUploading, setUploading }: Props) => {
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
    if (fileList.some(file => file.size > LIMIT)) {
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
        await roomStore.fetchRoomList();
        const roomId = roomStore.myRoom.id;
        setUploading(true);

        const uploadPromiseList = () =>
          fileList.map(async file => {
            try {
              const dto: UploadFileDTO = {
                roomId,
                targetFolderId: null,
                userIds: [String(userId)],
                roleIds: [5],
                fileSize: file.size,
              };
              const res = await fileStore.uploadFile(file, dto);
              console.log('res', res);
              if (res)
                return {
                  docsFileId: res.documentId,
                  fileName: res.documentName,
                  fileSize: res.documentSize,
                  fileExtension: res.documentExtension,
                };
              return;
            } catch (e) {
              return;
            }
          });
        const resultFileList = await Promise.all(uploadPromiseList())
          .then(fileList => fileList)
          .catch(e => {
            return [];
          });
        console.log(
          'result',
          resultFileList.filter(file => file.docsFileId),
        );
        setUploading(false);
        if (resultFileList.length) onChange([...attachments, ...resultFileList.filter(file => file.docsFileId)]);
      } else {
        uiStore.setDialogInfo({
          action: reason,
          onClick: [() => uiStore.setDialogInfo(null)],
        });
      }
    }
  };

  const handleDeleteClick = async (deleteId: number) => {
    const res = await fileStore.deleteFile({
      location: 0,
      objectList: [{ objectId: deleteId, deleted: 1, actionId: 202 }],
      userId: String(userId),
    });
    if (res === 200) {
      onChange(attachments.filter(file => file.docsFileId !== deleteId));
    }
  };

  const getByteSize = (size: number) => {
    const byteUnits = ['KB', 'MB', 'GB'];

    for (let i = 0; i < byteUnits.length; i++) {
      size = Math.floor(size / 1024);

      if (size < 1024) return size.toFixed(1) + byteUnits[i];
    }
  };

  return (
    <Accordion disableGutters elevation={0} defaultExpanded={!!attachments?.length} expanded={editable || undefined}>
      <AccordionSummary expandIcon={<ExpandIcon />} {...(editable && { onClick: () => uploadRef?.current?.click() })}>
        <Icon.AttachLine className="mr-8" width={20} height={20} />
        첨부파일
        {!editable && <AttachmentsCount>&nbsp;{attachments.length}</AttachmentsCount>}
      </AccordionSummary>
      <AccordionDetails>
        {isUploading ? (
          <div
            style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon.LoadingMotion />
          </div>
        ) : attachments?.length ? (
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
            />
          ))
        ) : (
          <></>
          // <AttachmentPlaceholder>마우스로 파일을 끌어올 수 있습니다.</AttachmentPlaceholder>
        )}
      </AccordionDetails>
      <input type="file" ref={uploadRef} style={{ display: 'none' }} onChange={handleAttach} multiple />
    </Accordion>
  );
};

// export default React.memo(Attachments, (prev, next) => prev.attachments === next.attachments);
export default Attachments;
