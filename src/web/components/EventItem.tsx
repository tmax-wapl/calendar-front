import { EventDTO, EventRangeDTO } from '@common/constants/interfaces';
import { Icon } from '@wapl/ui';
import { EventItemContainer, ItemTitleContainer, EventTitle, EventInfo, CalendarName } from './EventItem.style';

interface Props {
  event: EventRangeDTO | EventDTO;
  isDetail?: boolean;
}

const EventItem = ({ event, isDetail = false }: Props) => {
  return (
    <EventItemContainer isDetail={isDetail}>
      <ItemTitleContainer isDetail={isDetail}>
        <Icon.CalendarDotFill color={event.color} width={20} height={20} />
        {event.importance && <Icon.BookmarkFill className="mr-8" color="#fcbb00" width={16} height={16} />}
        <EventTitle>{event.title}</EventTitle>
      </ItemTitleContainer>
      <EventInfo>{event.start}</EventInfo>
      <EventInfo>{event.repeatStartDate}</EventInfo>
      {isDetail ? <EventInfo>{event.end}</EventInfo> : <CalendarName>{event.calId}</CalendarName>}
    </EventItemContainer>
  );
};

export default EventItem;
