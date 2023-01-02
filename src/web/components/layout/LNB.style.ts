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

export const DatePickerWrapper = styled.div`
  padding: 0px 20px;
`;

export const FilterListWrapper = styled.div`
  padding: 16px 8px 0px 8px;
`;

export const ScrollListWrapper = styled.div`
  height: calc(100% - 512px);
  overflow-y: scroll;
`;

export const CategoryListWrapper = styled.div`
  padding: 0px 8px;
`;

export const SubscriptionListWrapper = styled.div`
  padding: 0px 8px 0px 28px;
`;

export const Divider = styled.div`
  height: 1px;
  margin: 0px 12px;
  background: #e8eaed;
  border-radius: 1px;
`;
