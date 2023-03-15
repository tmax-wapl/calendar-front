import { Button, Checkbox, Dialog, DialogContent, DialogHeader, SearchField } from '@wapl/ui';
import RoomList from './RoomList';
import { FilterHeader, TitleWrapper, TitleTotal, TitleCount, ButtonWrapper } from './RoomScheduleDialog.style';

const RoomScheduleDialog = ({ onClose }: { onClose: () => void }) => {
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
          <Checkbox />
        </FilterHeader>
        <RoomList />
      </DialogContent>
      <ButtonWrapper>
        <Button size="large" style={{ width: '100%' }} variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button size="large" style={{ width: '100%' }}>
          저장
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
};

export default RoomScheduleDialog;
