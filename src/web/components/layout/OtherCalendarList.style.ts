import { styled, Mui } from '@wapl/ui';

export const OtherCalendarListContainer = styled.div`
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
  ${({ theme: { Font } }) => Font.Text.m.Regular};
`;

export const AddButton = styled(Mui.IconButton)`
  width: 28px;
  height: 28px;
  margin-left: auto;
  padding: 0;
`;

export const SubscriptionButton = styled(Mui.IconButton)`
  width: 100%;
  height: 44px;
  padding: 0px 12px;
  justify-content: left;
  border-radius: 8px;
  color: #80868b;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
`;
