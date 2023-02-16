import { styled } from '@wapl/ui';

export const ColorWrapper = styled.div<{ iterationCount: number; columnGap: number; rowGap: number }>`
  display: grid;
  grid-template-columns: repeat(${({ iterationCount }) => iterationCount}, 1fr);
  row-gap: ${({ rowGap }) => `${rowGap}px`};
  column-gap: ${({ columnGap }) => `${columnGap}px`};
`;

export const ColorItemWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  position: relative;
  cursor: pointer;
  :first-of-type {
    path {
      stroke: ${({ theme: { Color } }) => Color.Gray[900]};
      stroke-width: 1;
      stroke-dasharray: 3, 4;
      stroke-linecap: round;
    }
    &::after {
      ${({ selected, theme: { Color } }) =>
        selected &&
        `border-top: 0.1rem solid ${Color.Gray[900]};
        border-right: 0.1rem solid ${Color.Gray[900]};`}
    }
  }
  &::after {
    content: '';
    position: absolute;
    left: 30%;
    top: 35%;
    width: 7px;
    height: 3px;
    ${({ selected, theme: { Color } }) =>
      selected &&
      `border-top: 0.1rem solid ${Color.White[100]};
      border-right: 0.1rem solid ${Color.White[100]};`}
    transform: rotate(131deg);
  }
`;
