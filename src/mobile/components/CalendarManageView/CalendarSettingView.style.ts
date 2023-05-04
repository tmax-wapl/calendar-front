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

export const BodyWrapper = styled.div`
  max-height: 640px;
  overflow: auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 500px;
`;

export const ColorItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  :first-of-type {
    path {
      stroke: ${({ theme: { Color } }) => Color.Gray[900]};
      stroke-width: 1;
      stroke-dasharray: 3, 4;
      stroke-linecap: round;
    }
  }
`;

export const ColorItemContent = styled.div`
  display: flex;
  gap: 10px;
  height: 48px;
  align-items: center;
`;

export const ColorSelected = styled.span<{ selected: boolean }>`
  display: ${({ selected }) => (selected ? 'flex' : 'none')};
  width: 14px;
  height: 1.5px;
  transform: rotate(137deg);
  background: #ff6258;
  &::after {
    content: '';
    left: 69%;
    top: 247%;
    width: 7px;
    height: 1.5px;
    transform: rotate(95deg);
    position: absolute;
    background: #ff6258;
  }
`;
