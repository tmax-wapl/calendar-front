import { useEffect, useState } from 'react';
import { Icon } from '@wapl/ui';
import { ColorWrapper, ItemContainer, CurrentColor } from './ColorPicker.style';
import { ColorItem as colors } from '@/common/constants';
import { ContextMenu } from '../ContextMenu';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Observer } from 'mobx-react-lite';

interface Props {
  color?: string;
  onClick?: (color: string) => void;
}

export const ColorPicker = ({ color = '', onClick }: Props) => {
  const { uiStore } = useCalendarStores();
  const [selected, setSelected] = useState(color ?? '');

  const handleOpen = () => uiStore.setPickerInfo('color');

  const handleClose = () => uiStore.setPickerInfo(null);

  const handleSelect = (color: string) => {
    if (onClick) {
      onClick(color);
      handleClose();
    }
  };

  useEffect(() => {
    setSelected(color ?? '');
  }, [color]);

  return (
    <ColorWrapper>
      <ItemContainer onClick={handleOpen}>
        일정 색상
        <CurrentColor isNoneColor={!color} onClick={() => handleSelect(color)}>
          <Icon.CalendarDotFill color={color || ''} width={20} height={20} />
        </CurrentColor>
      </ItemContainer>
      <Observer>
        {() => (
          <ContextMenu
            open={uiStore.pickerInfo === 'color'}
            selected={selected}
            title="일정 색상"
            items={colors}
            onClose={handleClose}
            onClick={handleSelect}
            type="color"
            isColor
          />
        )}
      </Observer>
    </ColorWrapper>
  );
};
