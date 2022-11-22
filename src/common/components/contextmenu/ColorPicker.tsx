import React, { useEffect, useState } from 'react';
import { ColorItem, ColorWrapper } from './ColorPicker.style';

type ColorItemType = {
  value: string | null;
  color: string | null;
}[];

const ColorPicker = ({ color }: { color?: string }) => {
  const [selected, setSelected] = useState('');

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
  };

  useEffect(() => {
    setSelected(color);
  }, [color]);

  return (
    <ColorWrapper>
      {colorItem.map(({ color, value }) => (
        <ColorItem
          key={value}
          bgColor={color}
          firstEl={!value}
          selected={color === selected}
          onClick={() => handleSelect(color)}
        />
      ))}
    </ColorWrapper>
  );
};

export default ColorPicker;
