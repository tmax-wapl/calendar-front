import { Icon, Mui, styled, useWaplUiStore } from '@wapl/ui';
import { Member, RoomModel, SearchOrgRes, GetFavoriteOrgRes, useUserStore } from '@wapl/core';
import { useContext } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toLuxon, toUTC } from '@/utils';
import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { HTTPError } from '@/error';
import { CalendarModel } from '@/stores';
import { CustomRoomDTO } from '@/common/constants/interfaces';

const MenuItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContextMenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContextMenuItemLabel = styled.span`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  line-height: 21px;
`;

interface Props {
  id: number;
  type?: string;
  date?: {
    startdate?: string;
    enddate?: string;
  };
  data?: any;
  onClose?: () => void;
}

export const ContextMenuItem = ({ id, type, date, data, onClose }: Props) => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore, eventStore } = useCalendarStores();
  const { isGuest } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    toast: { notify },
  } = useWaplUiStore();

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  const deleteCalendar = async () => {
    await calendarStore.deleteCalendar(id);
    if ((pathname.includes('detail') || pathname.includes('update')) && id === eventStore.event.calId)
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
    closeDialog();
  };

  const deleteRoomCalendar = async () => {
    const newRoomList = calendarStore.roomCalendarList
      ?.filter((room: CalendarModel) => room.roomId !== id)
      .map(room => room.dto);
    calendarStore.setLocalRoomCalendarList(userId, newRoomList);
    closeDialog();
    uiStore.changeDateRange();
  };

  const deleteEvent = async () => {
    await calendarStore.deleteEvent(id);
    if (+eventStore.event.id === id && (pathname.includes('detail') || pathname.includes('update')))
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
    closeDialog();
    if (onClose) onClose();
  };

  const deleteRepeatEvent = async (value: string) => {
    const event = await eventStore.getEventInfo(id, date.startdate);
    switch (value) {
      case 'one': // 이 일정만 삭제
        await eventStore.updateEvent(id, event, EVENT_UPDATE_OPTION.ONCE_REPEAT_EVENT_EXCEPT);
        break;
      case 'after': // 이 일정 및 향후 일정 삭제
        await eventStore.updateEvent(id, event, EVENT_UPDATE_OPTION.AFTER_REPEAT_EVENT_EXCEPT);
        break;
      case 'all': // 모든 일정 삭제
        await calendarStore.deleteEvent(id);
        break;
      default:
        break;
    }
    if (+eventStore.event.id === id && (pathname.includes('detail') || pathname.includes('update')))
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
    closeDialog();
    uiStore.changeDateRange();
    if (onClose) onClose();
  };

  const handleNameChange = () => {
    calendarStore.setRenameId(id);
    if (onClose) onClose();
  };

  const handleCalendarSync = async () => {
    if (onClose) onClose();
    try {
      const { start, end } = uiStore.dateRange;
      const iCalendar = await calendarStore.syncCalendar(id, start, end);
      if (iCalendar.subscribeStatus === 'success') notify(`${iCalendar.name} 캘린더 동기화가 성공하였습니다.`);
      uiStore.changeDateRange();
    } catch (e) {
      if (e instanceof HTTPError && e.status === 500) calendarStore.updateCalendarDTO(id, 'subscribeStatus', 'wait');
    }
  };

  const handleCalendarDelete = () => {
    uiStore.setDialogInfo({
      action: type === 'subCalendar' ? 'calendarDelete' : 'subscriptionDelete',
      onClick: [closeDialog, deleteCalendar],
    });
    if (onClose) onClose();
  };

  const handleRoomCalendarDelete = () => {
    uiStore.setDialogInfo({
      action: 'roomCalendarDelete',
      onClick: [closeDialog, deleteRoomCalendar],
    });
    if (onClose) onClose();
  };

  const handleSubscribe = async (url: string) => {
    try {
      await calendarStore.createCalendar({ url, type: 'url' });
      closeDialog();
    } catch (e) {
      if (e instanceof HTTPError && e.status === 400) {
        uiStore.setDialogInfo({
          action: 'subscribeDuplication',
          onClick: [closeDialog],
        });
      } else {
        uiStore.setDialogInfo({
          action: 'subscribeFail',
          onClick: [closeDialog],
        });
      }
    }
  };

  const handleRoomSchedule = (roomList: CustomRoomDTO[]) => {
    const newRoomList = roomList
      .filter(room => room.checked === true)
      .map(room => {
        return {
          roomId: room.id,
          name: room.displayName,
          checkFlag: true,
          color: '#A143FF',
          regDate: toUTC(new Date()),
          type: 'room',
        };
      });
    calendarStore.setLocalRoomCalendarList(userId, [
      ...newRoomList,
      ...calendarStore.roomCalendarList.map(room => room.dto),
    ]);
    closeDialog();
    uiStore.changeDateRange();
  };

  const handleUrlSubscribe = () => {
    uiStore.setDialogInfo({
      action: 'subscribe',
      onCloseClick: closeDialog,
      onClick: [closeDialog, handleSubscribe],
      data: { placeholder: 'URL 입력' },
      type: 'input',
    });
  };

  const handleRoomSubscribe = () => {
    uiStore.setDialogInfo({
      action: 'roomSchedule',
      onCloseClick: closeDialog,
      onClick: [closeDialog, handleRoomSchedule],
      type: 'roomSchedule',
    });
  };

  const handleEventUpdate = async () => {
    const event = await eventStore.getEventInfo(id, date.startdate);
    eventStore.setEvent(event);
    if (!pathname.includes('update')) navigate(`/main/view-mode/${uiStore.viewMode}/update`);
    if (onClose) onClose();
    handleDateRange();
  };

  const handleDateRange = () => {
    eventStore.event.startDate = toLuxon(date.startdate);
    eventStore.event.endDate = toLuxon(date.enddate);
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

  const handleEventShare = async (
    personaIdList: Partial<Member>[],
    roomIdList: Partial<RoomModel & SearchOrgRes & GetFavoriteOrgRes>[],
  ) => {
    await eventStore.shareEvent({
      eventId: id,
      personaIdList: personaIdList.map(persona => persona.personaId),
      roomIdList: roomIdList.map(room => convertRoomObj(room)),
    });
    if (+eventStore.event.id !== id || !pathname.includes('detail')) return;
    const eventInfo = await eventStore.getEventInfo(id, date.startdate);
    eventStore.setEvent(eventInfo);
  };

  const handleEventShareClick = () => {
    uiStore.setDialogInfo({
      type: 'roomFriend',
      data: { title: '일정 공유' },
      onComplete: handleEventShare,
      onCloseClick: closeDialog,
    });
  };

  const handleEventDeleteClick = async () => {
    if (type === 'repeatEvent') {
      uiStore.setDialogInfo({
        action: 'repeatEventDelete',
        onClick: [closeDialog, deleteRepeatEvent],
        type: 'select',
      });
    } else {
      uiStore.setDialogInfo({
        action: 'eventDelete',
        onClick: [closeDialog, deleteEvent],
      });
    }
  };

  const handleSelectAll = (checkFlag = true) => {
    calendarStore.roomCalendarListCheckAll(userId, data, checkFlag);
    uiStore.changeDateRange();
  };

  const actions = {
    renameCalendar: {
      label: '이름 변경',
      onClick: handleNameChange,
      icon: <Icon.EditLine width={16} height={16} className="mr-8" />,
    },
    syncCalendar: {
      label: '캘린더 동기화',
      onClick: handleCalendarSync,
      icon: <Icon.RenewLine width={16} height={16} className="mr-8" />,
    },
    deleteCalendar: {
      label: '캘린더 삭제',
      onClick: handleCalendarDelete,
      icon: <Icon.DeleteLine width={16} height={16} className="mr-8" />,
    },
    addSubscribe: {
      label: 'URL로 추가',
      onClick: handleUrlSubscribe,
      icon: <Icon.Add1Line width={16} height={16} className="mr-8" />,
    },
    addRoomCalendar: {
      label: '룸 일정 가져오기',
      onClick: handleRoomSubscribe,
      icon: <Icon.ChatLine width={16} height={16} className="mr-8" />,
    },
    updateEvent: { label: '일정 수정', onClick: handleEventUpdate, icon: <Icon.EditLine className="mr-8" /> },
    deleteEvent: { label: '일정 삭제', onClick: handleEventDeleteClick, icon: <Icon.DeleteLine className="mr-8" /> },
    shareEvent: { label: '일정 공유', onClick: handleEventShareClick, icon: <Icon.ShareLine className="mr-8" /> },
    deleteRoomCalendar: {
      label: '캘린더 삭제',
      onClick: handleRoomCalendarDelete,
      icon: <Icon.DeleteLine width={16} height={16} className="mr-8" />,
    },
    selectAll: [
      {
        label: '전체 선택',
        onClick: () => handleSelectAll(),
        icon: <Icon.SelectLine width={16} height={16} className="mr-8 mt-2" />,
      },
      {
        label: '전체 선택 해제',
        onClick: () => handleSelectAll(false),
        icon: <Icon.UnselectLine width={16} height={16} className="mr-8 mt-2" />,
      },
    ],
  };

  const menuItems = (() => {
    switch (type) {
      case 'mainCalendar':
      case 'orgCalendar':
        return [actions.renameCalendar];
      case 'subCalendar':
        return [actions.renameCalendar, actions.deleteCalendar];
      case 'roomCalendar':
        return [actions.renameCalendar];
      case 'addOther':
        return [actions.addSubscribe];
      case 'subscribe':
        return [actions.renameCalendar, actions.syncCalendar, actions.deleteCalendar];
      case 'event':
      case 'repeatEvent':
        if (isGuest) return [actions.updateEvent, actions.deleteEvent];
        return [actions.updateEvent, actions.shareEvent, actions.deleteEvent];
      case 'shareEvent':
        return [actions.deleteEvent];
      case 'selectAll':
        return actions.selectAll;
      default:
        return [];
    }
  })();

  return (
    <ContextMenuItemContainer>
      {menuItems.map(item => (
        <Mui.MenuItem key={item.label} onClick={item.onClick}>
          <MenuItemWrapper>
            {item.icon}
            <ContextMenuItemLabel>{item.label}</ContextMenuItemLabel>
          </MenuItemWrapper>
        </Mui.MenuItem>
      ))}
    </ContextMenuItemContainer>
  );
};
