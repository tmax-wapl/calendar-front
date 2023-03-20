import { Dispatch, SetStateAction, useCallback } from 'react';
import { RoomListWrapper } from './RoomScheduleDialog.style';
import RoomItem from './RoomItem';
import { RoomType } from './RoomDummy';

const RoomList = ({
  roomList,
  selectedRoomList,
  setSelectedRoomList,
}: {
  roomList: RoomType[];
  selectedRoomList: string[];
  setSelectedRoomList: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleSelectedRoom = useCallback(
    (id: string, isChecked: boolean) => {
      if (isChecked) {
        setSelectedRoomList([...selectedRoomList, id]);
      } else if (!isChecked && selectedRoomList.includes(id)) {
        setSelectedRoomList(selectedRoomList.filter(el => el !== id));
      }
    },
    [selectedRoomList, setSelectedRoomList],
  );

  return (
    <RoomListWrapper>
      {roomList.map((room: RoomType) => (
        <RoomItem
          key={room.id}
          room={room}
          selectedRoomList={selectedRoomList}
          handleSelectedRoom={handleSelectedRoom}
        />
      ))}
    </RoomListWrapper>
  );
};

export default RoomList;
