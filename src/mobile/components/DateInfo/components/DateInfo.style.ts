import { styled } from '@wapl/ui';

export const DateInfo = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 56px;
  background: ${({ backgroundColor }) => backgroundColor ?? 'white'};
  align-items: end;
  box-sizing: border-box;
  padding: 0 20px 10px;
  > :not(:last-child) {
    margin-right: 8px;
  }
`;

export const DateDay = styled.strong`
  ${({ theme: { Font } }) =>
    Font
      ? Font.Text.l.Bold
      : `font-size:16px; 
  font-weight:700; 
  line-height:20px;`};
  color: ${({ theme: { Color } }) => (Color ? Color.Gray[900] : '#202124')};
`;

export const Holiday = styled.span<{ isRed: boolean }>`
  ${({ theme: { Font } }) =>
    Font
      ? Font.Text.s.Regular
      : `font-size: 13px;
    line-height: 16px;
    font-weight: 400;`};
  color: ${({ isRed, theme: { Color } }) =>
    Color ? (isRed ? Color.Validation.negative : Color.Gray[900]) : '#202124'};
`;

export const Lunar = styled.span<{ isRed: boolean }>`
  ${({ theme: { Font } }) =>
    Font
      ? Font.Text.s.Regular
      : `font-size: 13px;
    line-height: 16px;
    font-weight: 400;`};
  color: ${({ isRed, theme: { Color } }) =>
    Color ? (isRed ? Color.Validation.negative : Color.Gray[500]) : '#9AA0A6'};
`;
