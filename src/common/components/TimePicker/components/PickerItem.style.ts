import { styled } from '@wapl/ui';

export const PickerItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
`;

export const PickerValueWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  scroll-snap-align: start;
  border-radius: 8px;
  :hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;
