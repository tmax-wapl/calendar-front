import { styled } from '@wapl/ui';

export const LNBContainer = styled.div`
  width: 320px;
  height: 100%;
  background-color: #f8f9fa;
  flex-shrink: 0;
`;

export const LNBHeader = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin: 18px 0 24px 14px;
  font-size: 20px;
`;

export const LNBBody = styled.div`
  height: calc(100% - 74px);
  padding: 0px 20px 16px 20px;
  box-sizing: border-box;
`;
