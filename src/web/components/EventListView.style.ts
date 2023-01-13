import { styled } from '@wapl/ui';

export const EventListViewContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 380px;
  box-sizing: border-box;
  padding: 12px;
  overflow-y: auto;
`;

export const DateInfo = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  align-items: center;
  box-sizing: border-box;
  padding: 0 8px;
  > :not(:last-child) {
    margin-right: 8px;
  }
`;

export const DateDay = styled.span`
  display: flex;
  font-weight: 700;
  font-size: 16px;
`;

export const Holiday = styled.span`
  display: flex;
  font-weight: 400;
  font-size: 13px;
  color: #f44336;
`;

export const Lunar = styled.span`
  display: flex;
  font-weight: 400;
  font-size: 13px;
  color: #9aa0a6;
`;
