import { Checkbox } from '@wapl/ui';
import { useEffect, useState, memo, ChangeEvent } from 'react';
import {
  RoomItemContainer,
  RoomItemProfile,
  RoomItemContent,
  Title,
  Content,
  RoomItemCheckBox,
} from './RoomItem.style';

// TODO: roomType 정의
const RoomItem = ({
  room,
  allChecked,
  handleSelectedRoom,
}: {
  room: any;
  allChecked: boolean;
  handleSelectedRoom: (id: string, isChecked: boolean) => void;
}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    handleSelectedRoom(room.id, e.target.checked);
  };

  const RoomInfo = memo(() => (
    <>
      <RoomItemProfile>{room.icon}</RoomItemProfile>
      <RoomItemContent>
        <Title>{room.title}</Title>
        <Content>{room.content}</Content>
      </RoomItemContent>
    </>
  ));

  // TODO: myRoom 제외
  const isMyRoom = () => room.id === 'test';

  useEffect(() => {
    setChecked(allChecked);
    if (!isMyRoom()) handleSelectedRoom(room.id, allChecked);
  }, [allChecked]);

  return (
    <RoomItemContainer>
      <RoomInfo />
      <RoomItemCheckBox>
        <Checkbox checked={isMyRoom() ? false : checked} onChange={e => handleChange(e)} disabled={isMyRoom()} />
      </RoomItemCheckBox>
    </RoomItemContainer>
  );
};

export default memo(RoomItem);
