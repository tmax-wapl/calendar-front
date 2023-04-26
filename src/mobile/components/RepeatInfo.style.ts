import { styled } from '@wapl/ui';

export const RepeatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-of-type) {
    margin-left: 30px;
  }
`;

export const RepeatItemWrapper = styled.div`
  display: flex;
`;

export const PickerWrapper = styled.div`
  background: #f8f9fa;
  margin-bottom: 16px;
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
  height: 126px;
  padding: 0px 16px;
  background: #f8f9fa;
  scrollbar-width: none;

  div {
    flex: 1;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const Selected = styled.span`
  width: calc(100% - 32px);
  position: absolute;
  height: 46px;
  top: 41px;
  background: ${({ theme: { Color } }) => Color.Black[6]};
  border-radius: 8px;
`;

export const DateWrapper = styled.div<{ isInvalid?: boolean }>`
  display: flex;
  width: 92px;
  height: 28px;
  padding: 6px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 6px;
  ${({ isInvalid, theme: { Color } }) => isInvalid && `border: 1px solid ${Color.Validation.negative}`};
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  cursor: pointer;
  :hover {
    background: ${({ theme: { Color } }) => Color.Black[6]};
  }
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const RepeatDay = styled.div`
  display: flex;
  position: relative;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 50%;
  z-index: 1;
  padding: 1;

  :not(:last-child) {
    margin-right: 8px;
  }

  &.select {
    color: ${({ theme: { Color } }) => Color.White[100]};
    background: ${({ theme: { Color } }) => Color.Scarlet[500]};
    border-radius: 40%;
    & + & {
      :not(:first-of-type)::before {
        content: '';
        background: ${({ theme: { Color } }) => Color.Scarlet[500]};
        width: 35px;
        height: 24px;
        position: absolute;
        right: 50%;
        z-index: -2;
      }
    }
  }
`;

export const RepeatLabel = styled.span`
  ${({ theme: { Font } }) => Font.Text.xxs.Medium};
  ${({ theme: { Color } }) => Color.Gray[600]};
  padding: 0 16px;
`;
