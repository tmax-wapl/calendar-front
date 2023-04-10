import { styled } from '@wapl/ui';

export const NoResultContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme: { Color } }) => Color.Gray[500]};
`;

export const NoResultTitle = styled.span`
  display: flex;
  font-size: 13px;
  :first-of-type {
    margin-top: 6px;
  }
  :last-of-type {
    margin-bottom: 50px;
  }
`;
