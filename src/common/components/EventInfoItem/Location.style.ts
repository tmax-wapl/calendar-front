import { styled } from '@wapl/ui';

export const LocationContainer = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
`;

export const LocationInput = styled.input`
  display: flex;
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  padding: 0;
  ::placeholder {
    ${({ theme: { Font } }) => Font.Text.m.Regular};
    color: ${({ theme: { Color } }) => Color.Gray[500]};
  }
  :read-only {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
