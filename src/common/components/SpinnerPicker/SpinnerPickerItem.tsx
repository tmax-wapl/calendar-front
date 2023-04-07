import React from 'react';
import { observer } from 'mobx-react-lite';
import { PickerValueWrapper } from './SpinnerPickerItem.style';
import InfiniteScrollLoop from './InfiniteScrollLoop';

interface ValueProps {
  value: string;
}

const PickerValue = React.memo(({ value }: ValueProps) => {
  return <PickerValueWrapper>{value}</PickerValueWrapper>;
});

interface Props {
  height: number;
  itemHeight?: number;
  item: string[];
  selectedValue?: string;
  onValueChange?: (index: number) => void;
}

const SpinnerPickerItem = observer(({ height, itemHeight = 36, item, selectedValue, onValueChange }: Props) => {
  return (
    <InfiniteScrollLoop
      itemHeight={itemHeight}
      visibleHeight={height}
      itemCount={item.length}
      scrollTopValue={selectedValue}
      onValueChange={onValueChange}
    >
      {item.map(value => (
        <PickerValue key={value} value={value} />
      ))}
    </InfiniteScrollLoop>
  );
});

export default SpinnerPickerItem;
