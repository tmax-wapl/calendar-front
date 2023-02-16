import { styled, Mui, TextField } from '@wapl/ui';

export const EventTitleContainer = styled.div`
  display: flex;
  height: 62px;
  align-items: center;
`;

export const IconButton = styled(Mui.IconButton)`
  padding: 0;
  margin-right: 20px;
`;

export const EventTitleInput = styled(TextField)`
  .MuiInput-input::placeholder {
    ${({ theme: { Font } }) => Font.Text.m.Regular};
  }
`;
