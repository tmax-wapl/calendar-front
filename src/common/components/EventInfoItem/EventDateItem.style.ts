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

export const DateWrapper = styled.div<{ isInvalid?: boolean }>`
  display: flex;
  width: 122px;
  height: 28px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 6px;
  ${({ isInvalid }) => isInvalid && 'border: 1px solid #F44336'};
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

export const TimeWrapper = styled.div<{ isInvalid?: boolean }>`
  display: flex;
  width: 86px;
  height: 28px;
  box-sizing: border-box;
  padding: 5px 11px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  border: 1px solid ${({ isInvalid }) => (isInvalid ? '#F44336' : 'transparent')};
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
