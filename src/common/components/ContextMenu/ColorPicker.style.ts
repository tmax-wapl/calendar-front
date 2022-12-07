import { styled } from '@wapl/ui';

type ColorType = {
  bgColor: string;
  firstEl: boolean;
  selected: boolean;
};

export const ColorItem = styled.div<ColorType>`
  display: flex;
  width: 16.67px;
  height: 16.67px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 15px;
  border: ${({ firstEl }) => (firstEl ? '1px dashed #202124' : 'none')};
  &::after {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7px;
    height: 3px;
    margin-left: 5px;
    margin-top: 5px;
    border-top: ${({ firstEl, selected }) =>
      firstEl && selected ? '0.1rem solid #202124' : !firstEl && selected ? '0.1rem solid white' : 'none'};
    border-right: ${({ firstEl, selected }) =>
      firstEl && selected ? '0.1rem solid #202124' : !firstEl && selected ? '0.1rem solid white' : 'none'};
    transform: rotate(131deg);
  }
`;

export const ColorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 11px;
  column-gap: 15.3px;
`;
