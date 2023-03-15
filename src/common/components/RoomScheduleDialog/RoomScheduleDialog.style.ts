import { styled } from '@wapl/ui';

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 0px 20px 20px 20px;
  width: 100%;
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 31px;
`;

export const TitleWrapper = styled.div``;

export const TitleTotal = styled.span`
  ${({ theme: { Font } }) => Font.Text.xs.Regular};
  margin-right: 2px;
`;

export const TitleCount = styled.span`
  ${({ theme: { Font } }) => Font.Text.xs.Medium};
  color: ${({ theme: { Color } }) => Color.Scarlet[500]};
`;

export const RoomListWrapper = styled.div`
  max-height: 472px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
