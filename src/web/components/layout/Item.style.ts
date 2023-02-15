import { styled, Mui, Icon } from '@wapl/ui';

export const ItemContainer = styled.div<{ main: boolean }>`
  display: flex;
  order: ${({ main }) => (main ? 1 : 2)};
`;

export const InputItemContainer = styled.div<{ calendarcolor: string }>`
  display: flex;
  width: 100%;
  height: 44px;
  padding: 0px 12px;
  border-radius: 8px;
  align-items: center;
  .Mui-checked {
    background-color: ${({ calendarcolor }) => calendarcolor} !important;
  }
`;

export const Input = styled(Mui.TextField)`
  width: calc(100% - 30px);
  margin-left: 10px;
  .MuiInputBase-root {
    height: 30px;
    border-radius: 8px;
    .MuiInputBase-input {
      ${({ theme: { Font } }) => Font.Text.m.Regular};
      padding: 0px 12px;
    }
  }
`;

export const CheckItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  padding: 0px 12px;
  border-radius: 8px;
  box-sizing: border-box;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    svg,
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
    ${({ theme: { Font } }) => Font.Text.m.Regular};
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

export const ErrorIcon = styled(Icon.ErrorLine)`
  display: none;
  flex-shrink: 0;
  margin-right: 6px;
`;

export const ButtonWarpper = styled(Mui.IconButton)`
  display: none;
  width: 28px;
  height: 28px;
  padding: 0px;
`;
