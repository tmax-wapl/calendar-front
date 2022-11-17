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
  font-size: 22px;
  font-weight: 700;
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
  width: 32px;
  border: 1px solid #e8eaed;
  border-radius: 6px 0px 0px 6px;
  &:hover {
    cursor: pointer;
    background: #e8eaed;
  }

  &::after {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5px;
    height: 5px;
    margin-top: 12px;
    margin-left: 14px;
    border-top: 0.1rem solid #202124;
    border-right: 0.1rem solid #202124;
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
  font-size: 13px;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  color: #202124;
  &:hover {
    cursor: pointer;
    background: #e8eaed;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
`;

export const ViewSelect = styled(Select<string>)`
  background: white;
  color: #202124;
  border: 1px solid #e8eaed;
  border-radius: 6px;

  ~ .MuiSelectUnstyled-popper {
    z-index: 2;
  }
`;
