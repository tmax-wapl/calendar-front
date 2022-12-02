import React, { useState } from 'react';
import { Icon } from '@wapl/ui';
import { LocationContainer, LocationInput } from './Location.style';

interface Props {
  location?: string;
  onChange?: (value: { location: string }) => void;
  editable?: boolean;
}

const Location = ({ location, onChange, editable = false }: Props) => {
  const [value, setValue] = useState<typeof location>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange({ location: e.target.value });
    setValue(e.target.value);
  };

  return (
    <LocationContainer>
      <Icon.LocationLine className="mr-8" color="#202124" width={20} height={20} />
      <LocationInput
        value={location || value}
        placeholder="장소 추가"
        onChange={handleInputChange}
        readOnly={!editable}
      />
    </LocationContainer>
  );
};

export default React.memo(Location, (prev, next) => prev.location === next.location);
