import React from 'react';
import InfiniteScrollLoop from './InfiniteScrollLoop';
import { PickerItemContainer, PickerValueWrapper } from './SelectItem.style';

interface ValueProps {
  value: string;
  onClick: (value: string) => void;
  isSelected?: boolean;
}

const PickerValue = React.memo(({ value, onClick, isSelected = false }: ValueProps) => {
  return (
    <PickerValueWrapper className={isSelected ? 'selected' : ''} onClick={() => onClick(value)}>
      {value}
    </PickerValueWrapper>
  );
});

interface Props {
  height: number;
  item: string[];
  currentValue?: string;
  selectedValue: string;
  onValueClick: (value: string) => void;
  isInfinite?: boolean;
  onOutsideClick?: () => void;
}

const SelectItem = ({
  height,
  item,
  selectedValue,
  onValueClick,
  isInfinite = false,
  onOutsideClick,
  currentValue,
}: Props) => {
  return isInfinite ? (
    <InfiniteScrollLoop onOutsideClick={onOutsideClick} visibleHeight={height} scrollTopValue={selectedValue}>
      {item.map(value => (
        <PickerValue
          key={value}
          value={value}
          onClick={onValueClick}
          isSelected={currentValue ? value === currentValue : value === selectedValue}
        />
      ))}
    </InfiniteScrollLoop>
  ) : (
    <PickerItemContainer>
      {item.map(value => (
        <PickerValue key={value} value={value} onClick={onValueClick} isSelected={value === selectedValue} />
      ))}
    </PickerItemContainer>
  );
};

export default React.memo(SelectItem, (prev, next) =>
  prev.currentValue ? prev.currentValue === next.currentValue : prev.selectedValue === next.selectedValue,
);
