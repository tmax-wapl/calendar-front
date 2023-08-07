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
  justify-content: space-between;
  box-sizing: border-box;
  width: 75px;
  border: 1px solid ${({ isInvalid, theme: { Color } }) => (isInvalid ? Color.Validation.negative : 'transparent')};
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
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 51.8%;
`;

export const TimeInputWrapper = styled(MeridiemValueWrapper)`
  max-width: 51.8%;
  padding: 0 5px 0 0;
`;

export const TimeSelectorWrapper = styled.div`
  position: absolute;
  top: 100%;
  z-index: 2;
  margin-top: 8px;
  background: ${({ theme: { Color } }) => Color.White[100]};
`;
