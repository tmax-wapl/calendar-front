import { styled, Mui, Chip } from '@wapl/ui';

export const Accordion = styled(Mui.Accordion)`
  &:before {
    display: none;
  }
`;

export const AccordionSummary = styled(Mui.AccordionSummary)`
  padding: 0;
`;

export const ParticipantsCount = styled.span`
  color: ${({ theme: { Color } }) => Color.Scarlet[500]};
`;

export const AccordionDetails = styled(Mui.AccordionDetails, {
  shouldForwardProp: (prop: string) => prop !== 'editable',
})<{ editable: boolean }>`
  display: flex;
  min-height: 32px;
  flex-wrap: wrap;
  align-items: center;
  padding: ${({ editable }) => (editable ? 0 : '0 0 0 28px')};
  margin-bottom: ${({ editable }) => (editable ? '10px' : '8px')};
  background: ${({ editable, theme: { Color } }) => (editable ? Color.Gray[100] : 'none')};
  border-radius: 8px;
`;

export const ParticipantChip = styled(Chip, {
  shouldForwardProp: (prop: string) => prop !== 'editable',
})<{ editable: boolean }>`
  ${({ editable }) => !editable && 'height: 32px !important; padding: 6px !important;'}
  :not(:last-child) {
    margin-right: 6px;
  }
`;

export const ParticipantsPlaceholder = styled.span`
  margin: 0 12px;
  color: ${({ theme: { Color } }) => Color.Gray[400]};
`;
