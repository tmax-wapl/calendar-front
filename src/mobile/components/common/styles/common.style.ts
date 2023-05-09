import { styled } from '@wapl/ui';

export const BodyWrapper = styled.div`
  max-height: 640px;
  overflow: auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 500px;
`;

export const ItemContainer = styled.div<{ height?: string }>`
  display: flex;
  height: ${({ height }) => height || '44'}px;
  align-items: center;
  justify-content: space-between;
`;

export const ItemTitleContainer = styled.div`
  display: flex;
  height: 44px;
  justify-content: space-between;
  padding: 0 16px;
`;

export const ButtonWrapper = styled.div`
  padding: 8px 16px 16px;
`;
