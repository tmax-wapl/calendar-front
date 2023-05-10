import { styled } from '@wapl/ui';

export const EventSearchViewContainer = styled.div`
  width: 100%;
  height: 100%;
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  display: flex;
  flex-direction: column;
`;

export const SearchFieldContainer = styled.div`
  height: 56px;
  padding: 0 16px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;

export const SearchFieldWrapper = styled.div`
  flex: 1;
  .MuiFilledInput-input {
    height: 36px !important;
    box-sizing: border-box;
  }
`;

export const TextButton = styled.button`
  padding: 0;
  padding-left: 12px;
  ${({ theme: { Font } }) => Font.Text.l.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  border: none;
  background: transparent;
  flex-shrink: 0;
`;
