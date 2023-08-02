import { styled } from '@wapl/ui';

export const EventDateItemContainer = styled.div`
  display: flex;
  height: 44px;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
  align-items: center;
`;

export const PickerContainer = styled.div`
  display: flex;
  position: relative;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  :first-of-type {
    margin-left: auto;
  }
  :not(:last-of-type) {
    margin-right: 4px;
  }
`;

export const DateWrapper = styled.div<{ isInvalid?: boolean; isMasked?: boolean }>`
  display: flex;
  width: 100px;
  padding: 6px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid ${({ isInvalid, theme: { Color } }) => (isInvalid ? Color.Validation.negative : 'transparent')};
  cursor: pointer;
  :hover {
    background: ${({ theme: { Color } }) => Color.Black[6]};
  }
  ${({ theme: { Color }, isMasked }) => isMasked && `color: ${Color.Gray[400]};`}
`;

export const DatePickerWrapper = styled.div<{ allDay?: boolean }>`
  position: absolute;
  top: 100%;
  transform: ${({ allDay }) => (allDay ? 'translate(-60%, 0)' : 'translate(-30%, 0)')};
  z-index: 2;
  margin-top: 8px;
  padding: 16px;
  background: ${({ theme: { Color } }) => Color.Background[2]};
  box-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
  border-radius: 12px;
`;

export const TimeWrapper = styled.div<{ isInvalid?: boolean }>`
  display: flex;
  width: 75px;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${({ isInvalid, theme: { Color } }) => (isInvalid ? Color.Validation.negative : 'transparent')};
  :hover {
    background: ${({ theme: { Color } }) => Color.Black[6]};
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
  background: ${({ theme: { Color } }) => Color.White[100]};
`;
