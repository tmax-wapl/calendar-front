import { styled } from '@wapl/ui';

export const EventDateItemContainer = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
`;

export const PickerContainer = styled.div`
  display: flex;
  position: relative;
  :first-of-type {
    margin-left: auto;
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const DatePickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  margin-top: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
  border-radius: 12px;
`;

export const TimeWrapper = styled.div`
  display: flex;
  width: 74px;
  box-sizing: border-box;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  :hover {
    background: rgba(0, 0, 0, 0.04);
  }
  > :last-child {
    margin-left: auto;
  }
`;

export const TimeValue = styled.span`
  display: flex;
`;

export const TimePickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  margin-top: 8px;
  background: #fff;
`;
