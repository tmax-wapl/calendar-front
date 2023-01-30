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
  background: #f1f3f4;
  outline: none;
  border: none;
  border-radius: 10px;
`;

export const PickerContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: 8px;
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
    color: #fff;
    background: #ff6258;
    border-radius: 50%;
    & + & {
      :not(:first-of-type)::before {
        content: '';
        background: #ff6258;
        width: 28px;
        height: 20px;
        position: absolute;
        right: 50%;
        z-index: -1;
      }
    }
  }
`;
