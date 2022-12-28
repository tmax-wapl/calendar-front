import React from 'react';
import { Icon } from '@wapl/ui';
import {
  Accordion,
  AccordionSummary,
  AttachmentsCount,
  AccordionDetails,
  AttachmentItem,
  AttachmentName,
  AttachmentSize,
  AttachmentPlaceholder,
} from './Attachments.style';

interface Props {
  attachments?: any[];
  editable?: boolean;
}

const Attachments = ({ attachments = [], editable = false }: Props) => {
  const ExpandIcon = (): JSX.Element => {
    if (editable) return <Icon.Add2Line color="#202124" width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#bdbdbd" width={20} height={20} />;
  };

  return (
    <Accordion disableGutters elevation={0} defaultExpanded={!!attachments?.length} expanded={editable || undefined}>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Icon.AttachLine className="mr-8" color="#202124" width={20} height={20} />
        첨부파일
        {!editable && <AttachmentsCount>&nbsp;{attachments.length}</AttachmentsCount>}
      </AccordionSummary>
      <AccordionDetails>
        {attachments.length ? (
          attachments.map(attachment => (
            <AttachmentItem key={attachment.id}>
              <Icon.ImageColor className="mr-8" width={20} height={20} />
              <AttachmentName>
                {`${attachment.name}${attachment.extension ? `.${attachment.extension}` : ''}`}
              </AttachmentName>
              <AttachmentSize>{`${attachment.size / 1000}KB`}</AttachmentSize>
              {editable && <Icon.DeleteFill color="#bdc1c6" width={16} height={16} />}
            </AttachmentItem>
          ))
        ) : (
          <AttachmentPlaceholder>마우스로 파일을 끌어올 수 있습니다.</AttachmentPlaceholder>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default React.memo(Attachments, (prev, next) => prev.attachments === next.attachments);
