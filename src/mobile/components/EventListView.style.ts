import { styled } from '@wapl/ui';

export const EventListViewContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 100%;
`;

export const DateInfo = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 56px;
  background: #f8f9fa;
  align-items: end;
  box-sizing: border-box;
  padding: 0 20px 10px;
  > :not(:last-child) {
    margin-right: 8px;
  }
`;

export const DateDay = styled.strong`
  ${({ theme: { Font } }) => Font.Text.l.Bold};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
`;

export const Holiday = styled.span<{ isRed: boolean }>`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ isRed, theme: { Color } }) => (isRed ? Color.Validation.negative : Color.Gray[900])};
`;

export const Lunar = styled.span<{ isRed: boolean }>`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ isRed, theme: { Color } }) => (isRed ? Color.Validation.negative : Color.Gray[500])};
`;

export const EventListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 18px 20px;
  overflow-y: auto;
`;
