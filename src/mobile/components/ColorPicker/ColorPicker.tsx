import { memo, useEffect, useState } from 'react';
import { Icon, ContextMenu } from '@wapl/ui';
import {
  ColorWrapper,
  ColorItemWrapper,
  ItemContainer,
  CurrentColor,
  ColorLabel,
  ColorItemContent,
  ColorSelected,
} from './ColorPicker.style';
import { ColorItem as colors } from '@/common';
import EventBar from '../header/EventBar';
import { BodyWrapper, ContentWrapper } from '../common/styles/common.style';

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

  const ColorItem = memo(({ color, label }: { color: string; label: string }) => (
    <ColorItemContent>
      <Icon.CalendarDotFill color={color} width={20} height={20} />
      <ColorLabel>{label}</ColorLabel>
    </ColorItemContent>
  ));

  return (
    <ColorWrapper>
      <ItemContainer onClick={handleOpen}>
        일정 색상
        <CurrentColor isNoneColor={color === ''} onClick={() => handleSelect(color)}>
          <Icon.CalendarDotFill color={color} width={20} height={20} />
        </CurrentColor>
      </ItemContainer>

      <ContextMenu open={pickerToggle} onClose={handleClose}>
        <EventBar title={'일정 색상'} leftSide={[{ action: 'close', onClick: handleClose }]} />
        <BodyWrapper>
          <ContentWrapper style={{ padding: '0 18px', minHeight: '575px' }}>
            {colors.map(({ color, value, label }: { color: string; value: string; label: string }) => (
              <ColorItemWrapper key={value} onClick={() => handleSelect(color)}>
                <ColorItem color={color} label={label} />
                <ColorSelected selected={color === selected} />
              </ColorItemWrapper>
            ))}
          </ContentWrapper>
        </BodyWrapper>
      </ContextMenu>
    </ColorWrapper>
  );
};
