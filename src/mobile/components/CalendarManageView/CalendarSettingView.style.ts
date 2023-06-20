import { styled, Mui, TextField, Icon } from '@wapl/ui';

export const CalendarSettingViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
`;

export const CalendarName = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;

export const IconButton = styled(Mui.IconButton)`
  margin-left: auto;
`;

export const Input = styled(TextField)`
  height: 36px;
  .MuiInputBase-root {
    height: 36px;
    border-radius: 8px;
    padding: 8px 8px 8px 12px;
    .MuiInputBase-input {
      ${({ theme: { Font } }) => Font.Text.m.Regular};
      padding: 0;
    }
    .Mui-focused {
      background: ${({ theme: { Color } }) => Color.Gray[100]} !important;
    }
  }
`;

export const SettingItem = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  ${({ theme: { Font } }) => Font.Text.l.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
`;

export const Divider = styled.span`
  height: 1px;
  background: ${({ theme: { Color } }) => Color.Gray[200]};
  border-radius: 1px;
`;

export const DotIcon = styled(Icon.CalendarDotFill)<{ color: string }>`
  path {
    stroke: ${({ theme: { Color }, color }) => !color && Color.Gray[900]};
    stroke-width: 1;
    stroke-dasharray: 3, 4;
    stroke-linecap: round;
  }
`;

export const Toast = styled(Mui.Snackbar)`
  left: 16px;
  right: 16px;
  bottom: 12px;
  .MuiPaper-root {
    height: 36px;
    display: flex;
    box-sizing: border-box;
    padding: 0 16px;
    background: ${({ theme: { Color } }) => Color.Black[70]};
  }
`;
