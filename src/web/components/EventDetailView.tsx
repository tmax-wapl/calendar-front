import { useEffect } from 'react';
import { Observer } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { useNavigate } from 'react-router-dom';
import { EventDetailViewContainer, EventDetailContainer, FromInfo, Creator } from './EventDetailView.style';
import EventBar from './EventBar';
import EventItem from './EventItem';
import { Participants, Location, Notifications, Description, Attachments } from '@common/components/EventInfoItem';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EVENT_UPDATE_OPTION } from '@common/constants';

const EventDetailView = () => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  };

  const handleEditClick = () => {
    navigate(`/main/view-mode/${uiStore.viewMode}/update`);
  };

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  const deleteEvent = async () => {
    await eventStore.deleteEvent(+eventStore.event.id);
    calendarStore.filterEventList(eventStore.event.id);
    navigate(-1);
    closeDialog();
  };

  const deleteRepeatEvent = async (value: string) => {
    const event = eventStore.event;
    switch (value) {
      case 'one': // 이 일정만 삭제
        await eventStore.updateEvent(+event.id, event, EVENT_UPDATE_OPTION.ONCE_REPEAT_EVENT_EXCEPT);
        break;
      case 'after': // 이 일정 및 향후 일정 삭제
        await eventStore.updateEvent(+event.id, event, EVENT_UPDATE_OPTION.AFTER_REPEAT_EVENT_EXCEPT);
        break;
      case 'all': // 모든 일정 삭제
        await eventStore.deleteEvent(+event.id);
        break;
      default:
        break;
    }
    closeDialog();
    uiStore.changeDateRange();
  };

  const handleDeleteClick = () => {
    if (!eventStore.event.rrule) {
      uiStore.setDialogInfo({
        action: 'eventDelete',
        onClick: [closeDialog, deleteEvent],
      });
    } else {
      uiStore.setDialogInfo({
        action: 'repeatEventDelete',
        onClick: [closeDialog, deleteRepeatEvent],
        type: 'select',
      });
    }
  };

  const shareEvent = async (personaIdList: number[], roomIdList: number[]) => {
    const event = eventStore.event;
    await eventStore.shareEvent({
      eventId: +event.id,
      personaIdList,
      roomIdList,
    });
    // TODO: 공유 완료 되었다는 팝업
  };

  const handleShareClick = () => {
    uiStore.setDialogInfo({
      type: 'roomFriend',
      data: { title: '일정 공유' },
      onComplete: shareEvent,
      onCloseClick: closeDialog,
    });
  };

  useEffect(() => {
    if (!eventStore.event.id) navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  }, []);

  return (
    <EventDetailViewContainer>
      <EventBar
        leftSide={[{ action: 'back', onClick: handleBackClick }]}
        rightSide={[
          { action: 'share', onClick: handleShareClick },
          { action: 'edit', onClick: handleEditClick },
          { action: 'delete', onClick: handleDeleteClick },
        ]}
      />
      <EventDetailContainer>
        <Observer>{() => <EventItem event={eventStore.event} isDetail />}</Observer>
        <Observer>
          {() => (
            <FromInfo>
              <Icon.CalendarLine className="mr-8" width={20} height={20} />
              {eventStore.event.calName}
              <Creator>&nbsp;{`(일정 생성: ${eventStore.event.regUserId})`}</Creator>
            </FromInfo>
          )}
        </Observer>
        {/* {eventStore.event.participants?.length && <Participants participants={eventStore.event.participants} />} */}
        <Observer>
          {() => (eventStore.event.location ? <Location location={eventStore.event.location} /> : null)}
        </Observer>
        <Observer>
          {() =>
            eventStore.event.notifications?.length > 0 && (
              <Notifications notifications={eventStore.event.notifications} />
            )
          }
        </Observer>
        <Observer>
          {() => (eventStore.event.description ? <Description description={eventStore.event.description} /> : null)}
        </Observer>
        {/* {eventStore.event.attachments?.length && <Attachments attachments={eventStore.event.attachments} />} */}
      </EventDetailContainer>
    </EventDetailViewContainer>
  );
};

export default EventDetailView;
