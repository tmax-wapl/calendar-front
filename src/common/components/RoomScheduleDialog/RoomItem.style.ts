import { styled } from '@wapl/ui';

export const RoomItemContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 68px;
  padding: 14px 0px;
`;

export const RoomItemProfile = styled.div`
  margin-right: 12px;
`;

export const RoomItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.span`
  ${({ theme: { Font } }) => Font.Text.m.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
`;

export const Content = styled.span`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;

export const RoomItemCheckBox = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;
