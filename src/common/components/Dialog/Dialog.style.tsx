import { styled, TextField, AlertTitle, AlertSubText, DialogContent, AlertSubAction, Mui } from '@wapl/ui';

export const Title = styled(AlertTitle)`
  margin: 0;
  ${({ theme: { Font } }) => Font.Text.l.Bold};
`;

export const SubTitle = styled(AlertSubText)`
  margin: 0;
  white-space: pre-line;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
`;

export const Description = styled(AlertSubText)`
  margin: 0;
  padding-top: 12px;
  white-space: pre-line;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
`;

export const InputDialogContent = styled(DialogContent)`
  overflow: hidden;
`;

export const Input = styled(TextField)`
  height: 32px;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
`;

export const InputDialogDescription = styled(AlertSubText)`
  margin: 0;
  ${({ theme: { Font } }) => Font.Text.xs.Regular};
`;

export const SelectDialogContent = styled(AlertSubAction)`
  text-align: start;
`;

export const SelectItemLabel = styled(Mui.FormControlLabel)`
  .MuiTypography-root {
    ${({ theme: { Font } }) => Font.Text.m.Regular};
  }
`;

export const DialogButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 0px 20px 20px 20px;
  button {
    flex: 1;
    cursor: pointer;
  }
`;
