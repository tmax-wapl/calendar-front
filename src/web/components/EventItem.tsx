import { Icon } from '@wapl/ui';
import { EventModel } from '@/stores/model/EventModel';
import { EventItemContainer, ItemTitleContainer, EventTitle, EventInfo, CalendarName } from './EventItem.style';
import { getRepeatSummary } from '@/utils';

interface Props {
  event: EventModel;
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
      {event.allDay ? (
        <EventInfo>종일</EventInfo>
      ) : (
        <EventInfo>{`${event.startDate.toFormat('a h:mm', { locale: 'ko' })} ~ ${event.endDate.toFormat('a h:mm', {
          locale: 'ko',
        })}`}</EventInfo>
      )}
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
