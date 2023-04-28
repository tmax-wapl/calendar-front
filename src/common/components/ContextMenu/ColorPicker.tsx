import { useEffect, useState } from 'react';
import { Icon } from '@wapl/ui';
import { ColorItem } from '@/common';
import { ColorWrapper, ColorItemWrapper } from './ColorPicker.style';
interface Props {
  color?: string;
  iterationCount?: number;
  columnGap?: number;
  rowGap?: number;
  onClick?: (color: string) => void;
}

export const ColorPicker = ({ color = '', iterationCount = 4, columnGap = 12, rowGap = 8, onClick }: Props) => {
  const [selected, setSelected] = useState(color ?? '');

  const handleSelect = (color: string) => {
    if (onClick) onClick(color);
  };

  useEffect(() => {
    setSelected(color ?? '');
  }, [color]);

  return (
    <ColorWrapper iterationCount={iterationCount} columnGap={columnGap} rowGap={rowGap}>
      {ColorItem.map(({ color, value }) => (
        <ColorItemWrapper key={value} selected={color === selected} onClick={() => handleSelect(color)}>
          <Icon.CalendarDotFill color={color} width={20} height={20} />
        </ColorItemWrapper>
      ))}
    </ColorWrapper>
  );
};
