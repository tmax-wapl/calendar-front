import { Icon } from '@wapl/ui';
import { EventModel } from '@/stores/model/EventModel';
import { EventItemContainer, ItemTitleContainer, EventTitle, EventInfo, CalendarName } from './EventItem.style';
import { getRepeatSummary } from '@/utils';
import { get12HoursFormat } from '../../utils';

interface Props {
  event: EventModel;
  isDetail?: boolean;
  onClick?: (id: number) => void;
}

const EventItem = ({ event, isDetail = false, onClick }: Props) => {
  return (
    <EventItemContainer isDetail={isDetail} onClick={() => onClick(+event.id)}>
      <ItemTitleContainer isDetail={isDetail}>
        <Icon.CalendarDotFill color={event.color} width={20} height={20} />
        {event.importance && <Icon.BookmarkFill className="mr-8" color="#fcbb00" width={16} height={16} />}
        <EventTitle>{event.title}</EventTitle>
      </ItemTitleContainer>
      <EventInfo>
        {event.allDay ? '종일' : `${get12HoursFormat(event.start)} ~ ${get12HoursFormat(event.end)}`}
      </EventInfo>
      {event.rrule && <EventInfo>{getRepeatSummary(event.rrule)}</EventInfo>}
      {isDetail ? (
        event.repeatEndDate && <EventInfo>{event.repeatEndDate.toFormat('yyyy. LL. dd. 종료')}</EventInfo>
      ) : (
        <CalendarName>{event.calName}</CalendarName>
      )}
    </EventItemContainer>
  );
};

export default EventItem;
