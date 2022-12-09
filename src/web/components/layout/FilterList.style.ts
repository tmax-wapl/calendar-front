import { styled, Mui } from '@wapl/ui';

export const FilterContainer = styled.div`
  padding-top: 16px;
`;

export const CheckBoxWrapper = styled(Mui.FormControlLabel)`
  display: flex;
  margin: 0px;
  height: 44px;
  .MuiFormControlLabel-label {
    font-size: 14px;
    margin-left: 8px;
  }
`;
