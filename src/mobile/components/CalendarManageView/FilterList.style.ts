import { styled, Mui } from '@wapl/ui';

export const CheckBoxWrapper = styled(Mui.FormControlLabel)`
  display: flex;
  margin: 0px;
  height: 48px;
  .MuiFormControlLabel-label {
    ${({ theme: { Font } }) => Font.Text.l.Regular};
    margin-left: 8px;
  }
`;
