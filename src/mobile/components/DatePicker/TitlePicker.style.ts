import { styled } from '@wapl/ui';

export const PickerContainer = styled.div<{ width: number; offsetLeft: number }>`
  display: flex;
  width: ${({ width }) => `${width}px`};
  height: 180px;
  margin-top: 26px;
  left: ${({ offsetLeft }) => `${offsetLeft}px`};
  padding: 8px 0px;
  position: absolute;
  z-index: 2;
  background-color: ${({ theme: { Color } }) => Color.White[100]};
  box-shadow: 0px 0px 8px ${({ theme: { Color } }) => Color.Black[20]};
  border-radius: 12px;
`;

export const PickerItemContainer = styled.div`
  width: 100%;
  position: relative;
  flex-direction: column;
  overflow: hidden scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export const PickerValueWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  scroll-snap-align: start;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  :hover {
    background: ${({ theme: { Color } }) => Color.Black[4]};
  }
`;
