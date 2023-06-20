import { styled, Button, Mui, TextField } from '@wapl/ui';

export const UrlSubscribeViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
`;

export const Input = styled(TextField)`
  height: 36px;
  margin-top: 10px;
  ${({ theme: { Font } }) => Font.Text.l.Regular};
  .MuiInputBase-root {
    height: 36px;
    padding: 8px 12px;
    .MuiInputBase-input {
      padding: 0;
    }
  }
`;

export const IconButton = styled(Mui.IconButton)`
  padding: 0px;
`;

export const Description = styled.span`
  margin-top: 10px;
  color: ${({ theme: { Color } }) => Color.Gray[600]};
  ${({ theme: { Font } }) => Font.Text.xs.Regular};
`;

export const Footer = styled.div`
  width: 100%;
  bottom: 0px;
  position: absolute;
  box-sizing: border-box;
  padding: 8px 16px 16px 16px;
`;

export const AddButton = styled(Button)`
  width: 100%;
  height: 48px;
  ${({ theme: { Font } }) => Font.Text.l.Regular};
`;

export const Toast = styled(Mui.Snackbar)`
  left: 16px;
  right: 16px;
  bottom: 76px;
  .MuiPaper-root {
    height: 36px;
    display: flex;
    box-sizing: border-box;
    padding: 0 16px;
    background: ${({ theme: { Color } }) => Color.Black[70]};
  }
`;
