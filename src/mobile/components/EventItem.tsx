import { Icon } from '@wapl/ui';
import { EventModel } from '@/stores/model/EventModel';
import {
  EventItemContainer,
  ItemTitleContainer,
  EventTitle,
  EventInfoContainer,
  EventInfo,
  CalendarName,
} from './EventItem.style';
import { getRepeatSummary } from '@/utils';
import { getEventDuration } from '../../utils';

interface Props {
  event: EventModel;
  isDetail?: boolean;
  onClick?: (event: EventModel) => void;
}

const EventItem = ({ event, isDetail = false, onClick }: Props) => {
  return (
    <EventItemContainer isDetail={isDetail} {...(onClick && { onClick: () => onClick(event) })}>
      <ItemTitleContainer isDetail={isDetail}>
        <Icon.CalendarDotFill color={event.backgroundColor} width={14} height={14} />
        {event.importance && (
          <Icon.BookmarkFill color="#fcbb00" width={14} height={14} {...{ style: { marginRight: '5px' } }} />
        )}
        <EventTitle>{event.title}</EventTitle>
      </ItemTitleContainer>
      <EventInfoContainer isDetail={isDetail}>
        <EventInfo>{getEventDuration(event.startDate, event.endDate, event.allDay)}</EventInfo>
        {event.rrule && <EventInfo>{getRepeatSummary(event.rrule)}</EventInfo>}
        {isDetail && event.repeatEndDate && <EventInfo>{event.repeatEndDate.toFormat('yyyy. LL. dd. 종료')}</EventInfo>}
      </EventInfoContainer>
      {isDetail && <CalendarName>{event.calName}</CalendarName>}
    </EventItemContainer>
  );
};

export default EventItem;
