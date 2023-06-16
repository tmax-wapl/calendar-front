import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, styled } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { AddButton as ArrowButton, OtherTitle as Title } from './OtherCalendarList.style';
import Item from './Item';

const ShareCalendarList = observer(() => {
  const [visible, setVisible] = useState(true);
  const { calendarStore } = useCalendarStores();

  const sortCalendarList = (): CalendarModel[] => {
    const filteredCalendars = calendarStore.calendarList
      ?.concat(calendarStore.roomCalendarList)
      .filter(({ type }) => ['share'].includes(type)); // TODO: url추가

    if (!filteredCalendars.length) return [];

    return filteredCalendars.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime());
  };

  return (
    <>
      {calendarStore.calendarList?.some(cal => cal.type === 'share') ? (
        <ShareListContainer>
          {calendarStore.roomCalendarList.length > 0 && (
            <Title>
              <ArrowButton onClick={() => setVisible(!visible)}>
                {visible ? (
                  <Icon.ArrowTopLine width={16} height={16} color="#80868B" />
                ) : (
                  <Icon.ArrowBottomLine width={16} height={16} color="#80868B" />
                )}
              </ArrowButton>
              공유 받은 캘린더
            </Title>
          )}
          {visible &&
            sortCalendarList()?.map((calendar: CalendarModel) => <Item key={calendar.id} category={calendar} />)}
        </ShareListContainer>
      ) : null}
    </>
  );
});

export default ShareCalendarList;

export const ShareListContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 3;
`;
