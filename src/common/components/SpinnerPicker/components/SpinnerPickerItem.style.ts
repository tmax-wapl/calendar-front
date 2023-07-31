import { styled } from '@wapl/ui';

export const PickerValueWrapper = styled.div<{ height: number }>`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: ${({ height }) => `${height}px`};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  scroll-snap-align: start;
  border-radius: 8px;
`;
