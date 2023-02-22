import { DatePickerWrapper } from '@/common/components/EventInfoItem/EventDateItem.style';
import { Select, styled } from '@wapl/ui';

export const CalendarHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

export const DateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 125px;
  margin: 0 auto;
  border: 0px;
  ${({ theme: { Font } }) => Font.Text.xxl.Bold};
  border-radius: 6px;
  &:hover {
    cursor: pointer;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin: 0px 12px;
`;

export const PrevButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  border: 1px solid ${({ theme: { Color } }) => Color.Gray[200]};
  border-radius: 6px 0px 0px 6px;
  &:hover {
    cursor: pointer;
    background: ${({ theme: { Color } }) => Color.Gray[200]};
  }

  &::after {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6px;
    height: 6px;
    margin-left: 3px;
    border-top: 0.1rem solid ${({ theme: { Color } }) => Color.Gray[900]};
    border-right: 0.1rem solid ${({ theme: { Color } }) => Color.Gray[900]};
    transform: rotate(-135deg);
  }
`;

export const NextButton = styled(PrevButton)`
  transform: rotate(-180deg);
`;

export const TodayButton = styled.div`
  display: flex;
  width: 64px;
  height: 30px;
  max-height: 32px;
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

export const LeftContainer = styled.div`
  display: flex;
  position: relative;
`;

export const ViewSelect = styled(Select<string>)`
  height: 32px;
  background: white;
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  border: 1px solid ${({ theme: { Color } }) => Color.Gray[200]};
  border-radius: 6px;
  ${({ theme: { Font } }) => Font.Text.s.Medium};

  ~ .MuiSelectUnstyled-popper {
    z-index: 3;
    ul {
      min-width: 64px;
    }
  }
`;

export const StyledDatePickerWrapper = styled(DatePickerWrapper)`
  z-index: 3;
`;
