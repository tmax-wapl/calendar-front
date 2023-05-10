import { styled } from '@wapl/ui';

export const SearchEventListContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const MonthInfo = styled.strong`
  height: 48px;
  ${({ theme: { Font } }) => Font.Text.xxl.Bold};
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

export const DateInfo = styled.li`
  height: 28px;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;
