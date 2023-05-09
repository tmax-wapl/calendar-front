import { styled, Mui } from '@wapl/ui';

export const CategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  padding: 0px 12px;
  border-radius: 8px;
  align-items: center;
  box-sizing: border-box;
  cursor: default;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
`;

export const AddButton = styled(Mui.IconButton)`
  width: 28px;
  height: 28px;
  margin-left: auto;
  padding: 0;
`;
