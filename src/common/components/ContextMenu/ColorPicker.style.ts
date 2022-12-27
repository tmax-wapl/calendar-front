import { styled } from '@wapl/ui';

export const ColorWrapper = styled.div<{ iterationCount: number; columnGap: number }>`
  display: grid;
  grid-template-columns: repeat(${({ iterationCount }) => iterationCount}, 1fr);
  row-gap: 8px;
  column-gap: ${({ columnGap }) => `${columnGap}px`};
`;

export const ColorItemWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  position: relative;
  cursor: pointer;
  :first-of-type {
    path {
      stroke: #202124;
      stroke-width: 1;
      stroke-dasharray: 3, 4;
      stroke-linecap: round;
    }
    &::after {
      ${({ selected }) =>
        selected &&
        `border-top: 0.1rem solid #202124;
        border-right: 0.1rem solid #202124;`}
    }
  }
  &::after {
    content: '';
    position: absolute;
    left: 30%;
    top: 35%;
    width: 7px;
    height: 3px;
    ${({ selected }) =>
      selected &&
      `border-top: 0.1rem solid #fff;
      border-right: 0.1rem solid #fff;`}
    transform: rotate(131deg);
  }
`;
