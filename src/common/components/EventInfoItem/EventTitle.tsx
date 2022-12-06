import { Icon } from '@wapl/ui';
import { EventTitleContainer, IconButton, EventTitleInput } from './EventTitle.style';

interface Props {
  title?: string;
  importance?: boolean;
}

const EventTitle = ({ title = '', importance }: Props) => {
  return (
    <EventTitleContainer>
      <IconButton>
        <Icon.BookmarkFill color={importance ? '#fcbb00' : '#bdc1c6'} width={20} height={20} />
      </IconButton>
      <EventTitleInput placeholder="일정 제목을 입력해주세요." visibleClear={false} value={title} />
    </EventTitleContainer>
  );
};

export default EventTitle;
