import { styled, Mui } from '@wapl/ui';
const { IconButton } = Mui;

export const DatePickerContainer = styled.div<{ backgroundColor?: string }>`
  width: max-content;
  height: max-content;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const DatePickerHeader = styled.div<{ size: number }>`
  width: calc(280px * ${({ size }) => size});
  height: 18px;
  line-height: 18px;
  margin-bottom: 16px;
`;

export const DatePickerBody = styled.div<{ size: number }>`
  width: calc(280px * ${({ size }) => size});
  height: calc(256px * ${({ size }) => size});
`;

export const StyledIconButton = styled(IconButton)`
  font-size: 14px;
  padding: 0px;
`;

export const CalendarPickerButtonWrapper = styled.div`
  float: right;
`;
