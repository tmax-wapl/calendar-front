import { Button, Checkbox, Dialog, DialogContent, DialogHeader, SearchField } from '@wapl/ui';
import { useCallback, memo, useState, useEffect } from 'react';
import { DialogButton } from '../Dialog';
import RoomList from './RoomList';
import { FilterHeader, TitleWrapper, TitleTotal, TitleCount, ButtonWrapper } from './RoomScheduleDialog.style';

const RoomScheduleDialog = ({ buttons, onClose }: { buttons: DialogButton[]; onClose: () => void }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [selectedRoomList, setSelectedRoomList] = useState(new Set<string>());

  return (
    <Dialog open>
      <DialogHeader title="룸 일정 가져오기" handleClose={onClose} />
      <DialogContent style={{ minHeight: '472px', overflow: 'hidden' }}>
        <SearchField placeholder="룸 검색" variant="filled" style={{ marginBottom: '10px' }} />
        <FilterHeader>
          <TitleWrapper>
            <TitleTotal>전체</TitleTotal>
            <TitleCount>5</TitleCount>
          </TitleWrapper>
          <Checkbox checked={allChecked} onChange={() => setAllChecked(!allChecked)} />
        </FilterHeader>
        <RoomList
          allChecked={allChecked}
          selectedRoomList={selectedRoomList}
          setSelectedRoomList={setSelectedRoomList}
        />
      </DialogContent>
      <ButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button
            key={button.text}
            width="100%"
            variant={button.variant}
            onClick={() => button.onClick(Array.from(selectedRoomList))}
          >
            {button.text}
          </Button>
        ))}
      </ButtonWrapper>
    </Dialog>
  );
};

export default RoomScheduleDialog;
