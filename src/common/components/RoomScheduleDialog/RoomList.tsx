import { Dispatch, SetStateAction, useCallback } from 'react';
import { CustomRoomDTO } from '@/common/constants/interfaces';
import { RoomListWrapper } from './RoomScheduleDialog.style';
import RoomItem from './RoomItem';

interface Props {
  roomList: CustomRoomDTO[];
  setRoomList: Dispatch<SetStateAction<CustomRoomDTO[]>>;
}

const RoomList = ({ roomList, setRoomList }: Props) => {
  const onChange = useCallback(
    (id: number, checked: boolean) => {
      setRoomList(prev => prev.map(room => (room.id === id ? { ...room, checked } : room)));
    },
    [roomList, setRoomList],
  );

  return (
    <RoomListWrapper>
      {roomList?.map(room => (
        <RoomItem key={room.id} room={room} onChange={onChange} />
      ))}
    </RoomListWrapper>
  );
};

export default RoomList;
