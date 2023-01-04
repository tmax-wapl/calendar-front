import { get12HoursFormat } from '@/utils';
import { EventDTO, EventRangeDTO } from '@common/constants/interfaces';
import { Icon } from '@wapl/ui';
import { EventItemContainer, ItemTitleContainer, EventTitle, EventInfo, CalendarName } from './EventItem.style';

interface Props {
  event: EventRangeDTO | EventDTO;
  isDetail?: boolean;
  onClick?: (id: number) => void;
}

const EventItem = ({ event, isDetail = false, onClick }: Props) => {
  return (
    <EventItemContainer isDetail={isDetail} onClick={() => onClick(event.id)}>
      <ItemTitleContainer isDetail={isDetail}>
        <Icon.CalendarDotFill color={event.color} width={20} height={20} />
        {event.importance && <Icon.BookmarkFill className="mr-8" color="#fcbb00" width={16} height={16} />}
        <EventTitle>{event.title}</EventTitle>
      </ItemTitleContainer>
      <EventInfo>
        {event.allDay ? '종일' : `${get12HoursFormat(event.start)} ~ ${get12HoursFormat(event.end)}`}
      </EventInfo>
      <EventInfo>{event.repeatStartDate}</EventInfo>
      {isDetail ? <EventInfo>{event.repeatEndDate}</EventInfo> : <CalendarName>{event.calName}</CalendarName>}
    </EventItemContainer>
  );
};

export default EventItem;
