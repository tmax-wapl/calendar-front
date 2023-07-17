import { styled } from '@wapl/ui';

export const TimeInputContainer = styled.div<{ isValid: boolean }>`
  display: flex;
  border: none;
`;

export const InputArea = styled.input`
  width: 100%;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: content-box;
  text-align: end;
  border: none;
  outline: none;
  font-size: 12px;
  font-family: 'Spoqa Han Sans Neo', sans-serif;
`;
