import { styled, Mui } from '@wapl/ui';

export const FilterName = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;

export const CheckBoxWrapper = styled(Mui.FormControlLabel)`
  display: flex;
  margin: 0px;
  height: 48px;
  .MuiFormControlLabel-label {
    ${({ theme: { Font } }) => Font.Text.l.Regular};
    margin-left: 8px;
  }
`;
