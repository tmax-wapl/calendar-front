import { useCallback } from 'react';
import { StyledSelect, StyledMenuItem } from './Select.style';
import { Mui, Icon, useTheme } from '@wapl/ui';

interface Props<T> {
  value: T;
  items: { label: string; value: T }[];
  onChange?: (item: T) => void;
}

const Select = <T extends string | number>({ value, items, onChange }: Props<T>) => {
  const { Color } = useTheme();

  const handleChange = useCallback(
    (e: Mui.SelectChangeEvent<unknown>) => {
      if ('function' === typeof onChange) onChange(e.target.value as T);
    },
    [onChange],
  );

  return (
    <StyledSelect
      value={value}
      onChange={handleChange}
      IconComponent={props => <Icon.ArrowBottomLine width={16} height={16} color={Color.Gray[900]} {...props} />}
      MenuProps={{ MenuListProps: { style: {} } }}
    >
      {items.map(item => (
        <StyledMenuItem key={item.value} value={item.value}>
          {item.label}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default Select;
