import { memo, useEffect, useState } from 'react';
import { Icon } from '@wapl/ui';
import { ColorWrapper, ItemContainer, CurrentColor, ColorLabel, ColorItemContent } from './ColorPicker.style';
import { ColorItem as colors } from '@/common/constants';
import { ContextMenu } from '../ContextMenu';

interface Props {
  color?: string;
  onClick?: (color: string) => void;
}

export const ColorPicker = ({ color = '', onClick }: Props) => {
  const [selected, setSelected] = useState(color ?? '');
  const [pickerToggle, setPickerToggle] = useState(false);

  const handleOpen = () => setPickerToggle(true);

  const handleClose = () => setPickerToggle(false);

  const handleSelect = (color: string) => {
    if (onClick) {
      onClick(color);
      setPickerToggle(false);
    }
  };

  useEffect(() => {
    setSelected(color ?? '');
  }, [color]);

  const ColorItem = memo(({ color, label }: { color?: string; label?: string }) => (
    <ColorItemContent>
      <Icon.CalendarDotFill color={color} width={20} height={20} />
      <ColorLabel>{label}</ColorLabel>
    </ColorItemContent>
  ));

  return (
    <ColorWrapper>
      <ItemContainer onClick={handleOpen}>
        일정 색상
        <CurrentColor isNoneColor={!color} onClick={() => handleSelect(color)}>
          <Icon.CalendarDotFill color={color || ''} width={20} height={20} />
        </CurrentColor>
      </ItemContainer>

      <ContextMenu
        open={pickerToggle}
        selected={selected}
        title="일정 색상"
        items={colors}
        onClose={handleClose}
        onClick={handleSelect}
        Component={ColorItem}
        isColor
      />
    </ColorWrapper>
  );
};
