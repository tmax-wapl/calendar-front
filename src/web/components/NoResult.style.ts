import { styled } from '@wapl/ui';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NoResultTitle = styled.span`
  display: flex;
  font-size: 14px;
  :last-child {
    margin-top: 20px;
  }
`;
