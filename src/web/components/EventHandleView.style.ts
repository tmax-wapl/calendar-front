import { styled, ButtonGroup as WButtonGroup } from '@wapl/ui';

export const EventHandleViewContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 380px;
  height: 100%;
  color: #202124;
`;

export const EventHandleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px 20px;
  font-size: 14px;
`;

export const FromInfo = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
`;

export const ButtonGroup = styled(WButtonGroup)`
  box-sizing: border-box;
  padding: 8px 10px 0 !important;
`;
