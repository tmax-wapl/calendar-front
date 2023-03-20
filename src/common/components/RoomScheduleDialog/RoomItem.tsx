import { Checkbox } from '@wapl/ui';
import { memo, ChangeEvent } from 'react';
import { RoomType } from './RoomDummy';
import {
  RoomItemContainer,
  RoomItemProfile,
  RoomItemContent,
  Title,
  Content,
  RoomItemCheckBox,
} from './RoomItem.style';

const RoomItem = ({
  room,
  selectedRoomList,
  handleSelectedRoom,
}: {
  room: RoomType;
  selectedRoomList: string[];
  handleSelectedRoom: (id: string, isChecked: boolean) => void;
}) => {
  // TODO: myRoom 제외
  const isMyRoom = () => room.id === 'test';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => handleSelectedRoom(room.id, e.target.checked);

  const RoomItemInfo = memo(() => (
    <>
      <RoomItemProfile>{room.icon}</RoomItemProfile>
      <RoomItemContent>
        <Title>{room.title}</Title>
        <Content>{room.content}</Content>
      </RoomItemContent>
      <RoomItemCheckBox>
        <Checkbox checked={selectedRoomList.includes(room.id)} onChange={e => handleChange(e)} disabled={isMyRoom()} />
      </RoomItemCheckBox>
    </>
  ));

  return (
    <RoomItemContainer>
      <RoomItemInfo />
    </RoomItemContainer>
  );
};

export default RoomItem;
