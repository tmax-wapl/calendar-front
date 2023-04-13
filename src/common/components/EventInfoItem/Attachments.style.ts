import { styled, Mui, Attachment } from '@wapl/ui';

export const Accordion = styled(Mui.Accordion)`
  &:before {
    display: none;
  }
`;

export const AccordionSummary = styled(Mui.AccordionSummary)`
  padding: 0;
`;

export const AttachmentsCount = styled.span`
  color: ${({ theme: { Color } }) => Color.Scarlet[500]};
`;

export const AccordionDetails = styled(Mui.AccordionDetails)`
  display: flex;
  flex-direction: column;
  height: 100px;
  box-sizing: border-box;
  padding: 4px;
  background: ${({ theme: { Color } }) => Color.Gray[100]};
  border-radius: 8px;
  overflow: hidden scroll;
`;

export const StyledAttachment = styled(Attachment)<{ isMine: boolean }>`
  width: 244px;
  box-sizing: border-box;
  & > div > p[class*='-TextEllipsisCss'] {
    width: ${({ isMine }) => (isMine ? '115px' : '140px')};
    margin: 14px 0px;
    max-width: 120px;
  }
`;

export const AttachmentPlaceholder = styled.span`
  margin: auto;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[500]};
`;
