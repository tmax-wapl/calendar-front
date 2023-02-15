import { styled } from '@wapl/ui';

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ItemTitleContainer = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
`;

export const DescriptionTextarea = styled.textarea<{ editable: boolean }>`
  display: flex;
  height: 100px;
  box-sizing: border-box;
  padding: 6px 8px;
  border: ${({ editable }) => (editable ? '1px solid #e8eaed' : 'none')};
  border-radius: 8px;
  outline: none;
  resize: none;
  font-size: 12px;
  line-height: 18px;
  ::placeholder {
    ${({ theme: { Font } }) => Font.Text.s.Regular};
    color: ${({ theme: { Color } }) => Color.Gray[500]};
  }
`;
