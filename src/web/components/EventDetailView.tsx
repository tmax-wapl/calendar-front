import { useEffect } from 'react';
import { Observer } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { Member, RoomModel, SearchOrgRes, GetFavoriteOrgRes } from '@wapl/core';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  EventDetailViewContainer,
  EventDetailContainer,
  FromInfoContainer,
  FromInfo,
  Creator,
  LoadingDescription,
} from './EventDetailView.style';
import { EventModel } from '@/stores';
import EventBar, { EventBarButton } from './EventBar';
import EventItem from './EventItem';
import { Participants, Location, Notifications, Description, Attachments } from '@common/components/EventInfoItem';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EVENT_UPDATE_OPTION } from '@common/constants';
import { Loader } from '@/common/components/Loader';

interface OutletProps {
  isEventUpdating: boolean;
  setEventUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventDetailView = () => {
  const { calendarStore, eventStore, uiStore, fileStore } = useCalendarStores();
  const navigate = useNavigate();
  const { isEventUpdating, setEventUpdating } = useOutletContext<OutletProps>();

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
    await calendarStore.deleteEvent(+eventStore.event.id);
    navigate(`/main/view-mode/${uiStore.viewMode}/date`);
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
    navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  };

  const eventBarButtons = (event: EventModel): EventBarButton[] => {
    if (isEventUpdating || event.subEvent || event.roomId) return;
    if (event.shareEvent) return [{ action: 'delete', onClick: handleDeleteClick }];
    return [
      { action: 'share', onClick: handleShareClick },
      { action: 'edit', onClick: handleEditClick },
      { action: 'delete', onClick: handleDeleteClick },
    ];
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

  const isRoomModel = (roomItem: RoomModel): roomItem is RoomModel => {
    return 'displayName' in roomItem;
  };

  const isSearchOrgRes = (searchOrgItem: SearchOrgRes): searchOrgItem is SearchOrgRes => {
    return !('orgId' in searchOrgItem);
  };

  const convertRoomObj = (item: Partial<RoomModel & SearchOrgRes & GetFavoriteOrgRes>) => {
    switch (true) {
      case isRoomModel(item as RoomModel):
        return item?.id;
      case isSearchOrgRes(item as SearchOrgRes):
        return item?.org.roomId;
      default:
        return item.roomId;
    }
  };

  const shareEvent = async (
    personaIdList: Partial<Member>[],
    roomIdList: Partial<RoomModel & SearchOrgRes & GetFavoriteOrgRes>[],
  ) => {
    const event = eventStore.event;
    await eventStore.shareEvent({
      eventId: +event.id,
      personaIdList: personaIdList.map(persona => persona.personaId),
      roomIdList: roomIdList.map(room => convertRoomObj(room)),
    });
    const eventInfo = await eventStore.getEventInfo(+event.id, event.start, event.roomId);
    eventStore.setEvent(eventInfo);
  };

  const handleShareClick = () => {
    uiStore.setDialogInfo({
      type: 'roomFriend',
      data: { title: '일정 공유' },
      onComplete: shareEvent,
      onCloseClick: closeDialog,
    });
  };

  const preventRefresh = (e: BeforeUnloadEvent) => {
    if (!isEventUpdating) return;
    Array.from(fileStore.uploadInfo.values()).map(info => info.cancelSource.cancel());
    e.preventDefault();
    e.returnValue = '';
    eventStore.setFileList([]);
    setEventUpdating(false);
    navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  };

  useEffect(() => {
    uiStore.setIsDetail(true);
    if (!isEventUpdating && !eventStore.event.id) navigate(`/main/view-mode/${uiStore.viewMode}/date`);
    return () => {
      uiStore.setIsDetail(false);
    };
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !(target.closest('#eventDetailView') || target.closest('#dateHandleButton') || target.closest('#todayButton')) &&
      isEventUpdating
    ) {
      uiStore.setDialogInfo({
        action: 'isEventUpdating',
        onClick: [() => uiStore.setDialogInfo(null)],
      });
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventRefresh, {});
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('beforeunload', preventRefresh);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isEventUpdating]);

  return (
    <EventDetailViewContainer id="eventDetailView">
      <Observer>
        {() => (
          <EventBar
            title={eventStore.event.startDate.toFormat('LL월 dd일 cccc', { locale: 'ko' })}
            leftSide={[{ action: 'back', onClick: handleBackClick }]}
            rightSide={eventBarButtons(eventStore.event)}
          />
        )}
      </Observer>
      {isEventUpdating ? (
        <Loader>
          <LoadingDescription>
            일정 생성 및 수정이 완료될 때까지,
            <br />
            잠시 기다려 주세요.
          </LoadingDescription>
        </Loader>
      ) : (
        <EventDetailContainer>
          <Observer>{() => <EventItem event={eventStore.event} isDetail />}</Observer>
          <Observer>
            {() => (
              <FromInfoContainer>
                <Icon.CalendarLine className="mr-8" width={20} height={20} />
                <FromInfo>
                  {eventStore.event.calName}
                  <Creator>{`일정 생성: ${eventStore.event.userNick}`}</Creator>
                </FromInfo>
              </FromInfoContainer>
            )}
          </Observer>
          <Observer>
            {() =>
              eventStore.event.eventMember?.personaList.length > 0 ||
              eventStore.event.eventMember?.roomList.length > 0 ? (
                <Participants
                  participants={[
                    ...eventStore.event.eventMember?.personaList,
                    ...eventStore.event.eventMember?.roomList,
                  ]}
                  editable={false}
                />
              ) : null
            }
          </Observer>
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
          <Observer>
            {() =>
              eventStore.event.attachments?.length > 0 && (
                <Attachments attachments={eventStore.event.attachments} roomId={eventStore.event.roomId} />
              )
            }
          </Observer>
        </EventDetailContainer>
      )}
    </EventDetailViewContainer>
  );
};

export default EventDetailView;
