import { styled, TextField, Mui } from '@wapl/ui';

export const Title = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 700;
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
  height: 15px;
  font-size: 12px;
  color: #80868b;
  margin: 0px 14px 8px 20px;
`;

export const DialogButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 14px 20px 20px 20px;
  button {
    flex: 1;
  }
`;
