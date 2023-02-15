import { styled } from '@wapl/ui';

export const LNBContainer = styled.div`
  width: 260px;
  height: 100%;
  background-color: #f8f9fa;
  flex-shrink: 0;
  border-right: 1px solid #e8eaed;
`;

export const LNBHeader = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 18px 14px 12px;
  ${({ theme: { Font } }) => Font.Text.xl.Medium};
`;

export const DatePickerWrapper = styled.div`
  padding: 12px 18px 16px;
`;

export const FilterListWrapper = styled.div`
  padding: 0px 8px;
`;

export const ScrollListWrapper = styled.div`
  height: calc(100% - 473px);
  padding-left: 8px;
  margin-bottom: 12px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;

export const Divider = styled.div`
  height: 1px;
  margin: 0px 12px;
  background: #e8eaed;
  border-radius: 1px;
`;
