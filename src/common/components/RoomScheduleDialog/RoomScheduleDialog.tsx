import { Button, Checkbox, Dialog, DialogContent, DialogHeader, SearchField } from '@wapl/ui';
import { memo, useState, ChangeEvent } from 'react';
import { DialogButton } from '../Dialog';
import { RoomDummy, RoomType } from './RoomDummy';
import RoomList from './RoomList';
import { FilterHeader, TitleWrapper, TitleTotal, TitleCount, ButtonWrapper } from './RoomScheduleDialog.style';

const RoomScheduleDialog = ({ buttons, onClose }: { buttons: DialogButton[]; onClose: () => void }) => {
  const [selectedRoomList, setSelectedRoomList] = useState([]);

  const handleAllCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedRoomList(
        RoomDummy.reduce((roomArray, room) => {
          if (room.id !== 'test') roomArray.push(room.id); // 본인 룸 id 제외
          return roomArray;
        }, []),
      );
    } else setSelectedRoomList([]);
  };

  const ContentHeader = memo(() => (
    <>
      <SearchField placeholder="룸 검색" variant="filled" style={{ marginBottom: '10px' }} />
      <FilterHeader>
        <TitleWrapper>
          <TitleTotal>전체</TitleTotal>
          <TitleCount>{RoomDummy.length}</TitleCount>
        </TitleWrapper>
        <Checkbox checked={selectedRoomList.length === RoomDummy.length - 1} onChange={e => handleAllCheck(e)} />
      </FilterHeader>
    </>
  ));

  const DialogButtons = memo(() => (
    <ButtonWrapper>
      {buttons?.map((button: DialogButton) => (
        <Button
          key={button.text}
          width="100%"
          variant={button.variant}
          onClick={() => button.onClick(selectedRoomList)}
        >
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
        <RoomList roomList={RoomDummy} selectedRoomList={selectedRoomList} setSelectedRoomList={setSelectedRoomList} />
      </DialogContent>
      <DialogButtons />
    </Dialog>
  );
};

export default RoomScheduleDialog;
