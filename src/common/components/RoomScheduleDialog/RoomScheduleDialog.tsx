import { useEffect, useState, memo, ChangeEvent } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useRoomStore } from '@wapl/core';
import { CustomRoomDTO } from '@/common/constants/interfaces';
import { Button, Checkbox, Dialog, DialogContent, DialogHeader, SearchField } from '@wapl/ui';
import { DialogButton } from '../Dialog';
import RoomList from './RoomList';
import { FilterHeader, TitleWrapper, TitleTotal, TitleCount, ButtonWrapper } from './RoomScheduleDialog.style';

const RoomScheduleDialog = ({ buttons, onClose }: { buttons: DialogButton[]; onClose: () => void }) => {
  const roomStore = useRoomStore();
  const { calendarStore } = useCalendarStores();
  const [roomList, setRoomList] = useState<CustomRoomDTO[]>([]);

  const fetchData = async () => {
    await roomStore.fetchRoomList();
    const list = roomStore.roomArray.map(room => {
      return {
        ...room,
        checked: false,
        disabled:
          room.type === 'my' || !!calendarStore.roomCalendarList.find(roomCalendar => roomCalendar.roomId === room.id),
        displayName: room.displayName,
        displayPhoto: room.displayPhoto,
      };
    });
    setRoomList(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAllCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setRoomList(prev => prev.map(room => (room.disabled ? room : { ...room, checked })));
  };

  const isAllChecked = () => {
    const checkedList = roomList.filter(room => room.checked || room.disabled).length;
    return checkedList === roomList.length;
  };

  const ContentHeader = memo(() => (
    <>
      <SearchField placeholder="룸 검색" variant="filled" style={{ marginBottom: '10px' }} />
      <FilterHeader>
        <TitleWrapper>
          <TitleTotal>전체</TitleTotal>
          <TitleCount>{roomList.length}</TitleCount>
        </TitleWrapper>
        <Checkbox checked={isAllChecked()} onChange={e => handleAllCheck(e)} />
      </FilterHeader>
    </>
  ));

  const DialogButtons = memo(() => (
    <ButtonWrapper>
      {buttons?.map((button: DialogButton) => (
        <Button key={button.text} width="100%" variant={button.variant} onClick={() => button.onClick(roomList)}>
          {button.text}
        </Button>
      ))}
    </ButtonWrapper>
  ));

  return (
    <Dialog open>
      <DialogHeader title="룸 일정 가져오기" handleClose={onClose} />
      <DialogContent style={{ minHeight: '472px', overflow: 'hidden' }}>
        <ContentHeader />
        <RoomList roomList={roomList} setRoomList={setRoomList} />
      </DialogContent>
      <DialogButtons />
    </Dialog>
  );
};

export default RoomScheduleDialog;
