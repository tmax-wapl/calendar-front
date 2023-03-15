import { RoomListWrapper } from './RoomScheduleDialog.style';
import { RoomDummy } from './RoomDummy';
import RoomItem from './RoomItem';

const RoomList = () => {
  return (
    <RoomListWrapper>
      {RoomDummy.map(room => (
        <RoomItem key={room.id} room={room} />
      ))}
    </RoomListWrapper>
  );
};

export default RoomList;
