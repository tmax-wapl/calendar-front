import { styled } from '@wapl/ui';

export const BodyWrapper = styled.div<{ height?: number }>`
  max-height: ${({ height }) => (height ? height : 640)}px;
  overflow: auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 500px;
`;

export const Selected = styled.span<{ selected: boolean }>`
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

export const ItemWrapper = styled.div<{ isColor: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ isColor, theme: { Color } }) =>
    isColor &&
    `
    :first-of-type {
      path {
        stroke: ${Color.Gray[900]};
        stroke-width: 1;
        stroke-dasharray: 3, 4;
        stroke-linecap: round;
      }
    }`}
`;

export const ItemContainer = styled.div<{ height?: string }>`
  display: flex;
  height: ${({ height }) => height || '44'}px;
  align-items: center;
  justify-content: space-between;
`;

export const ItemTitleContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: space-between;
  padding: 0 16px;
  :first-of-type {
    margin-top: 16px;
  }
`;

export const ButtonWrapper = styled.div`
  padding: 8px 16px 16px;
`;
