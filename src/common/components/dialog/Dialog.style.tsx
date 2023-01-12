import { styled, TextField, Mui } from '@wapl/ui';

export const Title = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 700;
  padding: 30px 32px 10px 32px;
  justify-content: center;
`;

export const InputDialogTitle = styled(Title)`
  padding: 21px 20px 15px 20px;
`;

export const CloseButton = styled(Mui.IconButton)`
  padding: 0px;
  margin-left: auto;
`;

export const Input = styled(TextField)`
  height: 32px;
  margin: 22px 20px 11px 20px;
`;

export const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin: 0px 32px;
  white-space: pre-line;
`;

export const Description = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  white-space: pre-line;
  font-size: 14px;
  color: #80868b;
  margin: 16px 32px 32px;
`;

export const InputDialogDescription = styled.div`
  font-size: 12px;
  color: #80868b;
  margin: 0px 14px 22px 20px;
`;

export const DialogButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 0px 20px 20px 20px;
  button {
    flex: 1;
  }
`;
