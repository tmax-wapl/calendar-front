import { styled } from '@wapl/ui';

export const CalendarHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 43px;
  padding: 5px 16px 0px;
`;

export const TodayButton = styled.div`
  display: flex;
  width: 48px;
  height: 28px;
  max-height: 28px;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  &:hover {
    cursor: pointer;
    background: ${({ theme: { Color } }) => Color.Gray[200]};
  }
`;

export const RightContainer = styled.div`
  display: flex;
`;
