import { styled } from '@wapl/ui';

export const PickerContainer = styled.div`
  display: flex;
  position: relative;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  :first-of-type {
    margin-left: auto;
  }
`;

export const TimeWrapper = styled.div<{ isInvalid?: boolean }>`
  display: flex;
  width: 75px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid ${({ isInvalid, theme: { Color } }) => (isInvalid ? Color.Validation.negative : 'transparent')};
  > :last-child {
    margin-left: auto;
  }
  text-decoration: ${({ isInvalid }) => (isInvalid ? 'line-through' : 'none')};
`;

export const TimeValue = styled.span`
  display: flex;
`;

export const MeridiemValueWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
  :hover {
    background: ${({ theme: { Color } }) => Color.Black[6]};
  }
`;

export const TimeValueWrapper = styled(MeridiemValueWrapper)`
  justify-self: end;
  max-width: 52%;
`;

export const TimeInputWrapper = styled(TimeValueWrapper)`
  padding: 0 5px 0 0;
`;

export const TimeSelectorWrapper = styled.div`
  position: absolute;
  top: 100%;
  z-index: 2;
  margin-top: 8px;
  background: ${({ theme: { Color } }) => Color.White[100]};
`;
