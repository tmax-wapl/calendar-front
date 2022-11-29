import { styled, Mui } from '@wapl/ui';
const { IconButton } = Mui;

export const DatePickerContainer = styled.div<{ size: number; backgroundColor?: string }>`
  width: calc(280px * ${({ size }) => size});
  height: calc(290px * ${({ size }) => size});
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const DatePickerHeader = styled.div`
  width: 100%;
  height: 18px;
  line-height: 18px;
  margin-bottom: 16px;
`;

export const DatePickerBody = styled.div`
  width: 100%;
  height: calc(100% - 34px);
`;

export const StyledIconButton = styled(IconButton)`
  font-size: 14px;
  padding: 0px;
`;

export const CalendarPickerButtonWrapper = styled.div`
  float: right;
`;
