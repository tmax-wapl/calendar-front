import { styled, Mui } from '@wapl/ui';

export const Accordion = styled(Mui.Accordion)`
  &:before {
    display: none;
  }
`;

export const AccordionSummary = styled(Mui.AccordionSummary)`
  padding: 0;
`;

export const AttachmentsCount = styled.span`
  color: #ff6258;
`;

export const AccordionDetails = styled(Mui.AccordionDetails)`
  display: flex;
  flex-direction: column;
  height: 100px;
  box-sizing: border-box;
  padding: 4px;
  background: #f1f3f4;
  border-radius: 8px;
`;

export const AttachmentPlaceholder = styled.span`
  margin: auto;
  font-size: 13px;
  color: #9aa0a6;
`;

export const AttachmentItem = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
  padding: 0 12px;
  background: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  :not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const AttachmentName = styled.span`
  display: flex;
  flex: 1;
`;

export const AttachmentSize = styled.span`
  font-size: 13px;
  color: #80868b;
  :not(:last-child) {
    margin-right: 8px;
  }
`;
