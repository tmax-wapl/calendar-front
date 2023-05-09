import { styled, Mui, TextField } from '@wapl/ui';

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

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
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
