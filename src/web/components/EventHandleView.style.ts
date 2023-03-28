import { styled, ButtonGroup as WButtonGroup } from '@wapl/ui';

export const EventHandleViewContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 100%;
  height: 100%;
  ${({ theme: { Color } }) => Color.Gray[900]};
`;

export const EventHandleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px 20px;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
  overflow: scroll;
`;

export const FromInfo = styled.div`
  display: flex;
  margin: 12px 0;
`;

export const ButtonGroup = styled(WButtonGroup)`
  box-sizing: border-box;
  padding: 16px 10px 0 !important;
`;
