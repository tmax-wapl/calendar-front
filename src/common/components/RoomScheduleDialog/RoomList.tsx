import { Dispatch, SetStateAction } from 'react';
import { RoomListWrapper } from './RoomScheduleDialog.style';
import { RoomDummy } from './RoomDummy';
import RoomItem from './RoomItem';

const RoomList = ({
  allChecked,
  selectedRoomList,
  setSelectedRoomList,
}: {
  allChecked: boolean;
  selectedRoomList: Set<string>;
  setSelectedRoomList: Dispatch<React.SetStateAction<Set<string>>>;
}) => {
  const handleSelectedRoom = (id: string, isChecked: boolean) => {
    if (isChecked) {
      selectedRoomList.add(id);
      setSelectedRoomList(selectedRoomList);
    } else if (!isChecked && selectedRoomList.has(id)) {
      selectedRoomList.delete(id);
      setSelectedRoomList(selectedRoomList);
    }
  };

  // TODO:// 체크 다하면 ALL 선택, 하나 풀리면 ALL 해제 로직

  return (
    <RoomListWrapper>
      {RoomDummy.map(room => (
        <RoomItem key={room.id} room={room} allChecked={allChecked} handleSelectedRoom={handleSelectedRoom} />
      ))}
    </RoomListWrapper>
  );
};

export default RoomList;
