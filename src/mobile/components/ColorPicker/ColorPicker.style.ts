import { styled } from '@wapl/ui';

export const ItemContainer = styled.div<{ height?: string }>`
  display: flex;
  width: 100%;
  height: ${({ height }) => height || '44'}px;
  align-items: center;
  justify-content: space-between;
`;

export const ColorWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const CurrentColor = styled.div<{ isNoneColor: boolean }>`
  display: flex;
  position: relative;
  cursor: pointer;
  ${({ isNoneColor, theme: { Color } }) =>
    isNoneColor &&
    `
    path {
      stroke: ${Color.Gray[900]};
      stroke-width: 1;
      stroke-dasharray: 3, 4;
      stroke-linecap: round;
    }
  `};

  &::after {
    content: '';
    position: absolute;
    left: 30%;
    top: 35%;
    width: 7px;
    height: 3px;
    border-top: ${({ isNoneColor, theme: { Color } }) =>
      `0.1rem solid ${isNoneColor ? Color.Gray[900] : Color.White[100]}`};
    border-right: ${({ isNoneColor, theme: { Color } }) =>
      `0.1rem solid ${isNoneColor ? Color.Gray[900] : Color.White[100]}`};
    transform: rotate(131deg);
  }
`;

export const ColorItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  :first-of-type {
    path {
      stroke: ${({ theme: { Color } }) => Color.Gray[900]};
      stroke-width: 1;
      stroke-dasharray: 3, 4;
      stroke-linecap: round;
    }
  }
`;

export const ColorItemContent = styled.div`
  display: flex;
  gap: 10px;
  height: 48px;
  align-items: center;
`;

export const ColorLabel = styled.span``;

export const ColorSelected = styled.span<{ selected: boolean }>`
  display: ${({ selected }) => (selected ? 'flex' : 'none')};
  width: 14px;
  height: 1.5px;
  transform: rotate(137deg);
  background: #ff6258;
  &::after {
    content: '';
    left: 69%;
    top: 247%;
    width: 7px;
    height: 1.5px;
    transform: rotate(95deg);
    position: absolute;
    background: #ff6258;
  }
`;
