import { RefObject, useCallback, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import { TimeSelectorContainer } from './TimeSelector.style';
import PickerItem from './PickerItemInput';
import { getDateTime } from '@/utils';

interface Props {
  type: string;
  value?: DateTime;
  currentValue?: string;
  selectedValue?: string;
  height?: number;
  item: Array<string>;
  exceptClickRef?: RefObject<HTMLDivElement>;
  isInfinite: boolean;
  onChange?: (time: DateTime) => void;
  onOutsideClick?: () => void;
}

const TimeSelector = ({
  type,
  value,
  currentValue,
  selectedValue,
  height,
  item,
  exceptClickRef,
  isInfinite,
  onOutsideClick,
  onChange,
}: Props) => {
  const selectorRef = useRef<HTMLDivElement | null>(null);

  const handleValueClick = useCallback((v: string) => {
    onChange(getDateTime(type, value, v));
    onOutsideClick();
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      !(e.target instanceof Node) ||
      selectorRef.current?.parentElement?.contains(e.target) ||
      exceptClickRef.current?.contains(e.target) ||
      !onOutsideClick
    )
      return;
    onOutsideClick();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  });

  return (
    <TimeSelectorContainer ref={selectorRef} height={height}>
      {selectedValue && (
        <PickerItem
          height={height}
          item={item}
          currentValue={currentValue}
          selectedValue={selectedValue}
          onValueClick={handleValueClick}
          isInfinite={isInfinite}
          onOutsideClick={onOutsideClick}
        />
      )}
    </TimeSelectorContainer>
  );
};

export default TimeSelector;
