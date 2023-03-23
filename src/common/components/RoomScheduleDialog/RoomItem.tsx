import { Checkbox, Avatar } from '@wapl/ui';
import { memo } from 'react';
import { CustomRoomDTO } from '@/common/constants/interfaces';
import {
  RoomItemContainer,
  RoomItemProfile,
  RoomItemContent,
  Title,
  Content,
  RoomItemCheckBox,
} from './RoomItem.style';

interface Props {
  room: CustomRoomDTO;
  onChange: (id: number, checked: boolean) => void;
}

const RoomItem = ({ room, onChange }: Props) => {
  // TODO: myRoom 제외
  const isMyRoom = () => room.type === 'my';

  const RoomItemInfo = memo(() => (
    <>
      <RoomItemProfile>
        <Avatar size={40} imgSrc={room.displayPhoto} />
      </RoomItemProfile>
      <RoomItemContent>
        <Title>{room.displayName}</Title>
        <Content>대화내용</Content>
      </RoomItemContent>
      <RoomItemCheckBox>
        <Checkbox
          checked={room.checked}
          onChange={e => onChange(room.id, e.target.checked)}
          disabled={room.disabled || isMyRoom()}
        />
      </RoomItemCheckBox>
    </>
  ));

  return (
    <RoomItemContainer>
      <RoomItemInfo />
    </RoomItemContainer>
  );
};

export default memo(RoomItem, (prev, next) => prev.room.checked === next.room.checked);
