import { useEffect } from 'react';
import { Observer } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { useNavigate } from 'react-router-dom';
import { EventDetailViewContainer, EventDetailContainer, FromInfo, Creator } from './EventDetailView.style';
import EventBar from './EventBar';
import EventItem from './EventItem';
import { Participants, Location, Notifications, Description, Attachments } from '@common/components/EventInfoItem';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EVENT_DELETE_OPTION } from '@common/constants';

const EventDetailView = () => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  };

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  const deleteEvent = async () => {
    await eventStore.deleteEvent(+eventStore.event.id, EVENT_DELETE_OPTION.DEFAULT);
    calendarStore.filterEventList(eventStore.event.id);
    navigate(-1);
    closeDialog();
  };

  const handleDeleteClick = () => {
    uiStore.setDialogInfo({
      action: 'eventDelete',
      onClick: [closeDialog, deleteEvent],
    });
  };

  useEffect(() => {
    if (!eventStore.event.id) navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  }, []);

  return (
    <EventDetailViewContainer>
      <EventBar
        leftSide={[{ action: 'back', onClick: handleBack }]}
        rightSide={[
          // { action: 'share', onClick: () => console.log('share') },
          { action: 'edit', onClick: () => navigate(`/main/view-mode/${uiStore.viewMode}/update`) },
          { action: 'delete', onClick: handleDeleteClick },
        ]}
      />
      {eventStore.event && (
        <EventDetailContainer>
          <Observer>{() => <EventItem event={eventStore.event} isDetail />}</Observer>
          <Observer>
            {() => (
              <FromInfo>
                <Icon.CalendarLine className="mr-8" color="#202124" width={20} height={20} />
                {eventStore.event.calName}
                <Creator>&nbsp;{`(일정 생성: ${eventStore.event.regUserId})`}</Creator>
              </FromInfo>
            )}
          </Observer>
          {/* {eventStore.event.participants.length && <Participants participants={eventStore.event.participants} />} */}
          {eventStore.event.location && <Observer>{() => <Location location={eventStore.event.location} />}</Observer>}
          {/* {eventStore.event.alarmList.length > 0 && (
            <Notifications notifications={eventStore.event.alarmList.map(({ time, timestamp }) => `${time} ${timestamp}`)} />
          )} */}
          {eventStore.event.description && (
            <Observer>{() => <Description description={eventStore.event.description} />}</Observer>
          )}
          {/* {eventStore.event.attachments?.length && <Attachments attachments={eventStore.event.attachments} />} */}
        </EventDetailContainer>
      )}
    </EventDetailViewContainer>
  );
};

export default EventDetailView;
