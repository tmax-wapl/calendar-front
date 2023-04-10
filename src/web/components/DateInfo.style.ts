import { styled } from '@wapl/ui';

export const DateInfoContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 62px;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  > :not(:last-child) {
    margin-right: 8px;
  }
`;

export const DateDay = styled.strong<{ isHighlight?: boolean }>`
  ${({ theme: { Font } }) => Font.Text.l.Bold};
  color: ${({ isHighlight, theme: { Color } }) => (isHighlight ? Color.Scarlet[500] : Color.Gray[900])};
`;

export const Holiday = styled.span<{ isRed: boolean }>`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ isRed, theme: { Color } }) => (isRed ? Color.Validation.negative : Color.Gray[900])};
`;

export const Lunar = styled.span<{ isRed: boolean }>`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ isRed, theme: { Color } }) => (isRed ? Color.Validation.negative : Color.Gray[500])};
`;
