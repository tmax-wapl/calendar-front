import { useEffect, useState } from 'react';
import { Icon } from '@wapl/ui';
import { ColorWrapper, ColorItemWrapper } from './ColorPicker.style';

type ColorItemType = {
  value: string;
  color: string;
}[];

interface Props {
  color?: string;
  iterationCount?: number;
  columnGap?: number;
  onClick?: (color: string) => void;
}

export const ColorPicker = ({ color = '', iterationCount = 4, columnGap = 12, onClick }: Props) => {
  const [selected, setSelected] = useState(color ?? '');

  const colorItem: ColorItemType = [
    { value: '', color: '' },
    { value: '#3384FF', color: '#3384FF' },
    { value: '#383FCA', color: '#383FCA' },
    { value: '#00C064', color: '#00C064' },
    { value: '#00C1B1', color: '#00C1B1' },
    { value: '#AECB00', color: '#AECB00' },
    { value: '#FCBB00', color: '#FCBB00' },
    { value: '#FF8E3D', color: '#FF8E3D' },
    { value: '#FF46B5', color: '#FF46B5' },
    { value: '#FF5154', color: '#FF5154' },
    { value: '#A143FF', color: '#A143FF' },
  ];

  const handleSelect = (color: string) => {
    setSelected(color);
    if (onClick) onClick(color);
  };

  return (
    <ColorWrapper iterationCount={iterationCount} columnGap={columnGap}>
      {colorItem.map(({ color, value }) => (
        <ColorItemWrapper key={value} selected={color === selected} onClick={() => handleSelect(color)}>
          <Icon.CalendarDotFill color={color} width={20} height={20} />
        </ColorItemWrapper>
      ))}
    </ColorWrapper>
  );
};
