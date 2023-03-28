import { styled, Mui } from '@wapl/ui';

export const StyledSelect = styled(Mui.Select)`
  .MuiOutlinedInput-root.MuiInputBase-root {
  }
  ${({ theme }) => theme.Font.Text.m.Regular};
  .MuiSelect-select.MuiSelect-outlined {
    min-height: auto;
    padding: 5px 12px 5px 0;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  .MuiSelect-icon {
    top: 6px;
    right: 10px;
  }
`;

export const StyledMenuItem = styled(Mui.MenuItem)`
  ${({ theme }) => theme.Font.Text.s.Regular};
  color: ${({ theme }) => theme.Color.Gray[900]};
  &.Mui-selected {
    background-color: ${({ theme }) => theme.Color.Black[6]};
    &.Mui-focusVisible {
      background-color: ${({ theme }) => theme.Color.Black[6]};
    }
    &:hover {
      background-color: ${({ theme }) => theme.Color.Black[4]};
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.Color.Black[4]};
  }
`;
