import { styled } from '@wapl/ui';

export const EventDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-of-type) {
    margin-left: 28px;
  }
`;

export const ItemTitleContainer = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
  > :last-child {
    margin-left: auto;
  }
`;
