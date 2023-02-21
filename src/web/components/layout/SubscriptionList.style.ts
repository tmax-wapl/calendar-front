import { styled, Mui } from '@wapl/ui';

export const SubscriptionButton = styled(Mui.IconButton)`
  width: 100%;
  height: 44px;
  padding: 0px 12px;
  justify-content: left;
  border-radius: 8px;
  color: #80868b;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
`;
