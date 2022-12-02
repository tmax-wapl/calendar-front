import { styled } from '@wapl/ui';

export const CalendarHeader = styled.div<{ isRed: boolean }>`
  width: 40px;
  height: 16px;
  display: inline-block;
  font-size: 11px;
  text-align: center;
  color: ${({ isRed }) => (isRed ? '#f44336' : '#202124')};
`;

export const CalendarContent = styled.div`
  width: 280px;
  height: 240px;
`;
