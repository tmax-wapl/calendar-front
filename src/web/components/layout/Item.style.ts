import { styled, Mui } from '@wapl/ui';

export const InputItemContainer = styled.div<{ calendarcolor: string }>`
  display: flex;
  height: 44px;
  padding: 0px 12px;
  border-radius: 8px;
  align-items: center;
  .Mui-checked {
    background-color: ${({ calendarcolor }) => calendarcolor} !important;
  }
`;

export const Input = styled(Mui.TextField)`
  width: 100%;
  margin-left: 10px;
  .MuiInputBase-root {
    height: 30px;
    border-radius: 8px;
    .MuiInputBase-input {
      font-size: 14px;
      padding: 0px 12px;
    }
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  height: 44px;
  padding: 0px 12px;
  border-radius: 8px;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    button {
      display: flex;
    }
  }
`;

export const CheckBoxWrapper = styled(Mui.FormControlLabel)<{ calendarcolor: string; type: string }>`
  display: flex;
  width: ${({ type }) => (type === 'url' ? `calc(100% - 56px)` : `calc(100% - 28px)`)};
  height: 44px;
  margin: 0px;
  overflow: hidden;
  .MuiFormControlLabel-label {
    font-size: 14px;
    margin-left: 8px;
  }
  .Mui-checked {
    background-color: ${({ calendarcolor }) => calendarcolor} !important;
  }
  .MuiTypography-root {
    width: calc(100% - 28px);
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ButtonWarpper = styled(Mui.IconButton)`
  display: none;
  width: 28px;
  height: 28px;
  padding: 0px;
`;
