import { styled } from '@wapl/ui';

export const EventDetailViewContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const EventDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 20px;
  ${({ theme: { Font } }) => Font.Text.l.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  overflow-y: auto;
`;

export const FromInfoContainer = styled.div`
  display: flex;
  height: 72px;
  svg {
    margin-top: 14px;
  }
`;

export const FromInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  align-self: center;
`;

export const Creator = styled.span`
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;
