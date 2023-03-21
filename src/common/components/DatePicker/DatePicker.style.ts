import { styled } from '@wapl/ui';

export const DatePickerContainer = styled.div<{ backgroundColor?: string }>`
  width: max-content;
  height: max-content;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const DatePickerBody = styled.div<{ size: number }>`
  width: calc(224px * ${({ size }) => size});
  height: calc(208px * ${({ size }) => size});
`;
