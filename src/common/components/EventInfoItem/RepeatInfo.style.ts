import { styled } from '@wapl/ui';

export const RepeatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-of-type) {
    margin-left: 30px;
  }
`;

export const ItemContainer = styled.div<{ height?: string }>`
  display: flex;
  height: ${({ height }) => height || '44'}px;
  align-items: center;
`;

export const RepeatIntervalInput = styled.input`
  display: flex;
  width: 38px;
  height: 32px;
  box-sizing: border-box;
  text-align: center;
  background: ${({ theme: { Color } }) => Color.Gray[100]};
  outline: none;
  border: none;
  border-radius: 10px;
`;

export const PickerContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
`;

export const DateWrapper = styled.div<{ isInvalid?: boolean }>`
  display: flex;
  width: 100px;
  padding: 6px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 6px;
  ${({ isInvalid, theme: { Color } }) => isInvalid && `border: 1px solid ${Color.Validation.negative}`};
  cursor: pointer;
  :hover {
    background: ${({ theme: { Color } }) => Color.Black[6]};
  }
`;

export const DatePickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  transform: translate(-60%, 0%);
  z-index: 1;
  margin-top: 8px;
  padding: 16px;
  background: ${({ theme: { Color } }) => Color.White[100]};
  box-shadow: 0px 0px 8px rgb(0 0 0 / 20%);
  border-radius: 12px;
`;

export const RepeatDay = styled.div`
  display: flex;
  position: relative;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 8px;
  }

  &.select {
    color: ${({ theme: { Color } }) => Color.White[100]};
    background: ${({ theme: { Color } }) => Color.Scarlet[500]};
    border-radius: 50%;
    & + & {
      :not(:first-of-type)::before {
        content: '';
        background: ${({ theme: { Color } }) => Color.Scarlet[500]};
        width: 28px;
        height: 20px;
        position: absolute;
        right: 50%;
        z-index: -1;
      }
    }
  }
`;
