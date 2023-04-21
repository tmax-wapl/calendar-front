import { styled, Mui } from '@wapl/ui';

export const HeaderContainer = styled.div`
  display: flex;
  height: 56px;
  padding: 24px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  svg {
    margin-left: 4px;
  }
`;

export const TextButton = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  ${({ selected, theme: { Color } }) => selected && { background: Color.Black[6] }}
`;

export const IconButton = styled(Mui.IconButton)`
  padding: 0;
  :first-of-type {
    margin-right: 12px;
  }
`;

export const CalendarPickerButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;
