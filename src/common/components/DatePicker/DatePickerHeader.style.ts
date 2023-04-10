import { styled, Mui } from '@wapl/ui';

export const HeaderContainer = styled.div<{ size: number }>`
  display: flex;
  width: calc(224px * ${({ size }) => size});
  height: 18px;
  padding: 0px 2px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

export const TitleWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  cursor: pointer;
  ${({ isMobile, theme: { Font } }) => (isMobile ? { fontSize: '18px', fontWeight: 500 } : Font.Text.m.Medium)};
  svg {
    margin-left: 4px;
  }
`;

export const TextButton = styled.div<{ selected: boolean; isMobile: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  ${({ isMobile, theme: { Font } }) => (isMobile ? { fontSize: '18px', fontWeight: 500 } : Font.Text.m.Medium)};
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
