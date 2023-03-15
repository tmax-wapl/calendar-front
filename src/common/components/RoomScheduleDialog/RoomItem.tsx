import { Checkbox } from '@wapl/ui';
import {
  RoomItemContainer,
  RoomItemProfile,
  RoomItemContent,
  Title,
  Content,
  RoomItemCheckBox,
} from './RoomItem.style';

// TODO: roomType 정의
const RoomItem = ({ room }: any) => {
  return (
    <RoomItemContainer>
      <RoomItemProfile>{room.icon}</RoomItemProfile>
      <RoomItemContent>
        <Title>{room.title}</Title>
        <Content>{room.content}</Content>
      </RoomItemContent>
      <RoomItemCheckBox>
        <Checkbox />
      </RoomItemCheckBox>
    </RoomItemContainer>
  );
};

export default RoomItem;
