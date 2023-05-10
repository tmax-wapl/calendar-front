import { styled } from '@wapl/ui';

export const NoResultContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NoResultTitle = styled.span`
  display: flex;
  font-size: 14px;
  :first-of-type {
    margin-top: 20px;
  }
  :last-of-type {
    margin-bottom: 50px;
  }
`;
