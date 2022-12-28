import { styled, Mui } from '@wapl/ui';

export const CharacterContainer = styled.div`
  border-top: 1px solid #e8eaed;
  height: calc(100% - 438px);
  overflow-y: scroll;
`;

export const SubscriptionContainer = styled.div`
  margin-left: 20px;
  border-top: 1px solid #e8eaed;
`;

export const CheckBoxWrapper = styled(Mui.FormControlLabel)<{ calendarcolor: string }>`
  display: flex;
  margin: 0px;
  height: 44px;
  .MuiFormControlLabel-label {
    font-size: 14px;
    margin-left: 8px;
  }
  .Mui-checked {
    background-color: ${({ calendarcolor }) => calendarcolor} !important;
  }
`;

export const SubscriptionButton = styled(Mui.IconButton)`
  height: 44px;
  padding: 0px;
  font-size: 14px;
  color: #80868b;
`;
