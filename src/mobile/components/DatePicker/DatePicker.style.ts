import { styled } from '@wapl/ui';

export const DatePickerContainer = styled.div<{ backgroundColor?: string }>`
  width: max-content;
  height: max-content;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const DatePickerBody = styled.div`
  width: 360px;
  height: 276px;
`;
