import { styled } from '@wapl/ui';

export const TimeSelectorContainer = styled('div', { shouldForwardProp: (prop: string) => prop !== 'height' })<{
  height: number;
}>`
  display: flex;
  height: ${({ height }) => `${height}px`};
  padding: 8px;
  background: #fff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  scrollbar-width: none;

  div {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
