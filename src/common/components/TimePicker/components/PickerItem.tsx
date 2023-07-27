import React from 'react';
import { PickerItemContainer, PickerValueWrapper } from './PickerItem.style';
import InfiniteScrollLoop from './InfiniteScrollLoop';

interface ValueProps {
  value: string;
  onClick: (value: string) => void;
  isSelected?: boolean;
}

const PickerValue = React.memo(({ value, onClick, isSelected = false }: ValueProps) => {
  return (
    <PickerValueWrapper style={{ background: isSelected ? 'rgba(0, 0, 0, 0.06)' : '' }} onClick={() => onClick(value)}>
      {value}
    </PickerValueWrapper>
  );
});

interface Props {
  height: number;
  item: string[];
  selectedValue: string;
  onValueClick: (value: string) => void;
  isInfinite?: boolean;
}

const PickerItem = ({ height, item, selectedValue, onValueClick, isInfinite = false }: Props) => {
  return isInfinite ? (
    <InfiniteScrollLoop visibleHeight={height} scrollTopValue={selectedValue}>
      {item.map(value => (
        <PickerValue key={value} value={value} onClick={onValueClick} isSelected={value === selectedValue} />
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

export default React.memo(PickerItem, (prev, next) => prev.selectedValue === next.selectedValue);
