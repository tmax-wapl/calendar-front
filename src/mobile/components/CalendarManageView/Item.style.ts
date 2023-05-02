import { styled, Mui, Icon } from '@wapl/ui';

export const ItemContainer = styled.div<{ main: boolean }>`
  display: flex;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  align-items: center;
  order: ${({ main }) => (main ? 1 : 2)};
`;

export const CheckBoxWrapper = styled(Mui.FormControlLabel)<{ calendarcolor: string; type: string }>`
  display: flex;
  width: 100%;
  height: 48px;
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
  flex-shrink: 0;
  margin: 0px 4px 0px 12px;
`;

export const ButtonWarpper = styled(Mui.IconButton)`
  width: 28px;
  height: 28px;
  padding: 0px;
  margin-left: -2px;
`;
