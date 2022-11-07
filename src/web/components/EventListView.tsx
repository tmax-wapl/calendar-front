import { Wrapper, DateInfo, Date, Holiday, Lunar } from './EventListView.style';
import EventItem from './EventItem';
import NoResult from './NoResult';

const EventListView = () => {
  const eventList: undefined[] = [undefined, undefined]; // TODO: store 변수로 대체

  return (
    <Wrapper>
      <DateInfo>
        <Date>9월 20일 월요일</Date>
        <Holiday>추석 연휴</Holiday>
        <Lunar>음력 8.14.</Lunar>
      </DateInfo>
      {eventList.length > 0 ? eventList.map((event, index) => <EventItem key={index} />) : <NoResult />}
    </Wrapper>
  );
};

export default EventListView;
