import { useRef, ChangeEvent } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useRoomStore } from '@wapl/core';
import { AttachmentInfo, Extension, FileInfo } from '@/common/constants/interfaces';
import { Icon } from '@wapl/ui';
import { Accordion, AccordionSummary, AttachmentsCount, AccordionDetails, StyledAttachment } from './Attachments.style';
import { APP_ID } from '@/common/constants';

interface Props {
  attachments?: AttachmentInfo[];
  setFileInfo?: (list: FileInfo[]) => void;
  onFileUpload?: (value: AttachmentInfo[]) => void;
  onFileDelete?: (id: number) => void;
  editable?: boolean;
  roomId?: number;
}

const Attachments = ({
  attachments = [],
  setFileInfo,
  onFileUpload,
  onFileDelete,
  editable = false,
  roomId,
}: Props) => {
  const roomStore = useRoomStore();
  const { uiStore } = useCalendarStores();
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

  const checkExtension = (extension: string) => {
    return ['jpg', 'pdf', 'wav', 'xlsx', 'mk4', 'pptx', 'word', 'zip', 'etc'].includes(extension);
  };

  const handleAttach = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files);
    if (fileList) {
      const { valid, reason } = checkValid(fileList, attachments);
      if (valid) {
        const fileInfoList = fileList.map(file => {
          const tempFileId = new Date().getTime() + Math.random();
          const extension = file.name.split('.').pop();
          onFileUpload([
            {
              docsFileId: tempFileId,
              fileName: file.name,
              fileSize: file.size,
              fileExtension: checkExtension(extension) ? (extension as Extension) : '',
            },
          ]);
          return { fileId: tempFileId, fileInfo: file };
        });
        setFileInfo(fileInfoList);
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
    const myRoomId = roomStore.myRoom.id;
    window.parent.postMessage({
      type: 'shell:runTopping',
      appId: APP_ID.OFFICE,
      args: {
        runToppingType: 2,
        roomId: roomId || myRoomId,
      },
    });
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
              type={checkExtension(attachment.fileExtension) ? (attachment.fileExtension as Extension) : 'etc'}
              size="medium"
              volume={getByteSize(attachment.fileSize)}
              isMine={editable}
              onDelete={() => onFileDelete(attachment.docsFileId)}
              {...(!editable && { onClick: () => handleAttachmentClick() })}
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
