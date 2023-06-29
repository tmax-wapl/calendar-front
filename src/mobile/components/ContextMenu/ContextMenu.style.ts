import { styled } from '@wapl/ui';

export const ItemContent = styled.div<{ isGap: boolean }>`
  display: flex;
  height: 48px;
  ${({ isGap }) => (isGap ? 'gap: 10px' : 'flex :1')};
  align-items: center;
`;
