import React, { useState } from 'react';
import { Icon } from '@wapl/ui';
import { LocationContainer, LocationInput } from './Location.style';

interface Props {
  location?: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

const Location = ({ location, onChange, editable = false }: Props) => {
  const [value, setValue] = useState<typeof location>('');
  const maxLength = 50;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxLength) return;
    if (onChange) onChange(e.target.value);
    setValue(e.target.value);
  };

  return (
    <LocationContainer>
      <Icon.LocationLine className="mr-8" width={20} height={20} />
      <LocationInput
        value={location || value}
        placeholder="장소 추가"
        maxLength={maxLength}
        onChange={handleInputChange}
        readOnly={!editable}
      />
    </LocationContainer>
  );
};

export default React.memo(Location, (prev, next) => prev.location === next.location);
