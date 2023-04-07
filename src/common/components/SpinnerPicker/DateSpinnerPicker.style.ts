import { Button, styled } from '@wapl/ui';

export const PickerContainer = styled.div`
  display: flex;
  height: 108px;
  padding: 0px 16px;
  background: #fff;
  scrollbar-width: none;

  div {
    flex: 1;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Selected = styled.span`
  width: calc(100% - 32px);
  position: absolute;
  height: 36px;
  top: 92px;
  background: ${({ theme: { Color } }) => Color.Black[6]};
  border-radius: 8px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 16px 16px 16px;
  button {
    flex: 1;
    cursor: pointer;
  }
`;

export const StyledButton = styled(Button)`
  height: 48px;
  ${({ theme: { Font } }) => Font.Text.l.Bold};
`;
