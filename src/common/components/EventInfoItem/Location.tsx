import { useState } from 'react';
import { Icon } from '@wapl/ui';
import { LocationContainer, LocationInput } from './Location.style';

interface Props {
  location: string;
  editable?: boolean;
}

const Location = ({ location, editable = false }: Props) => {
  const [data, setData] = useState<typeof location>(location);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  return (
    <LocationContainer>
      <Icon.LocationLine className="favicon" color="#202124" width={20} height={20} />
      <LocationInput value={data} placeholder="장소 추가" onChange={handleInputChange} readOnly={!editable} />
    </LocationContainer>
  );
};

export default Location;
