import { Icon } from '@wapl/ui';
import { useEffect, useRef, useState, memo, useContext } from 'react';
import { Observer } from 'mobx-react-lite';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { ColorItem as colors } from '@/common/constants';
import { HTTPError } from '@/error';
import EventBar from '../header/EventBar';
import {
  CalendarSettingViewContainer,
  CalendarName,
  IconButton,
  Input,
  SettingItem,
  DotIcon,
  Divider,
  Toast,
} from './CalendarSettingView.style';
import { EventModel, CalendarModel } from '@/stores';
import { ContextMenu } from '@mcomponents/ContextMenu';

const CalendarSettingView = () => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();
  const { id, roomId, name, type, color } = calendarStore.calendar;
  const calColor = colors.some(item => item.color === color) ? color : '';
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isColorPickerOpen, setColorPickerOpen] = useState<boolean>(false);
  const [toastState, setToastState] = useState({
    toastOpen: false,
    toastText: '',
  });
  const { toastOpen, toastText } = toastState;
  const [value, setValue] = useState<string>(name);
  const inputRef = useRef(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      handleRename();
    }
  };

  const handleRename = async () => {
    if (!value.trim()) {
      setValue(name);
      setEdit(false);
      return;
    }
    if (['private', 'org'].includes(type)) {
      calendarStore.calendar.name = value;
      calendarStore.addLocalRoomCalendarItem(userId, calendarStore.calendar.dto);
    } else {
      await calendarStore.updateCalendar(id, { name: value });
      calendarStore.updateCalendarDTO(id, 'name', value);
    }
    setEdit(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  });

  const handleBackClick = () => {
    uiStore.setPageDialogInfo('calendarManage');
  };

  const handleColorPickerOpen = () => setColorPickerOpen(true);

  const handleColorPickerClose = () => setColorPickerOpen(false);

  const handleColorClick = async (color: string) => {
    const calColor = color || calendarStore.defaultColor;
    if (['private', 'org'].includes(type)) {
      calendarStore.calendar.color = calColor;
      calendarStore.addLocalRoomCalendarItem(userId, calendarStore.calendar.dto);
      const roomEventList = calendarStore.eventList.map(event =>
        event.roomId === roomId ? new EventModel({ ...event.dto, calColor }) : event,
      );
      calendarStore.setEventList(roomEventList);
    } else {
      await calendarStore.updateCalendar(id, { color });
      calendarStore.updateCalendarDTO(id, 'color', calColor);
      if (type === 'share') {
        const sharedEventList = calendarStore.eventList.map(event =>
          event.roomId === null && event.shareEvent ? new EventModel({ ...event.dto, calColor }) : event,
        );
        calendarStore.setEventList(sharedEventList);
      } else {
        const eventList = calendarStore.eventList.map(event =>
          event.calId === id ? new EventModel({ ...event.dto, calColor }) : event,
        );
        calendarStore.setEventList(eventList);
      }
    }
    handleColorPickerClose();
  };

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  const handleCalendarSync = async () => {
    try {
      const { start, end } = uiStore.dateRange;
      const iCalendar = await calendarStore.syncCalendar(id, start, end);
      if (iCalendar.subscribeStatus === 'success')
        setToastState({ toastOpen: true, toastText: `${iCalendar.name} 캘린더 동기화가 성공하였습니다.` });
      else if (iCalendar.subscribeStatus === 'fail') {
        calendarStore.setCalendar(new CalendarModel(iCalendar));
        uiStore.setDialogInfo({
          action: 'deletedSubscribe',
          onClick: [closeDialog],
        });
      }
      uiStore.changeDateRange();
    } catch (e) {
      if (e instanceof HTTPError && e.status === 500) calendarStore.updateCalendarDTO(id, 'subscribeStatus', 'wait');
      uiStore.setDialogInfo({
        action: 'syncFail',
        onClick: [closeDialog],
      });
    }
  };

  const deleteCalendar = async () => {
    await calendarStore.deleteCalendar(id);
    closeDialog();
    uiStore.setPageDialogInfo('calendarManage');
  };

  const handleCalendarDelete = () => {
    uiStore.setDialogInfo({
      action: 'subscriptionDelete',
      onClick: [closeDialog, deleteCalendar],
    });
  };

  return (
    <>
      <EventBar title="캘린더 설정" leftSide={[{ action: 'back', onClick: handleBackClick }]} />
      <CalendarSettingViewContainer>
        {isEdit ? (
          <Input
            id="input"
            ref={inputRef}
            variant="filled"
            visibleClear
            autoFocus
            limit={50}
            value={value}
            onChange={e => {
              if (e.target.value.length > 50) return;
              setValue(e.target.value);
            }}
            onClear={() => {
              setValue('');
              document.getElementById('input').focus(); // inputRef로 focus 처리하는 방법을 모르겠음..
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') handleRename();
            }}
          />
        ) : (
          <CalendarName>
            {name}
            <Observer>
              {() =>
                type === 'url' &&
                calendarStore.calendar.subscribeStatus !== 'success' && (
                  <Icon.ErrorLine width={20} height={20} color=" #F44336" className="ml-4" />
                )
              }
            </Observer>
            {!['share', 'org'].includes(type) && (
              <IconButton onClick={() => setEdit(true)}>
                <Icon.EditLine color="#BDC1C6" width={20} height={20} />
              </IconButton>
            )}
          </CalendarName>
        )}
        <SettingItem onClick={handleColorPickerOpen}>
          <DotIcon color={calColor || ''} width={20} height={20} className="mr-8" />
          {colors.find(color => color.value === calColor).label}
        </SettingItem>
        {['url'].includes(type) && (
          <>
            <Divider />
            <SettingItem onClick={handleCalendarSync}>
              <Icon.RenewLine width={20} height={20} className="mr-8" />
              캘린더 동기화
            </SettingItem>
            <SettingItem onClick={handleCalendarDelete}>
              <Icon.DeleteLine width={20} height={20} className="mr-8" />
              캘린더 삭제
            </SettingItem>
          </>
        )}
      </CalendarSettingViewContainer>
      <Toast
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={toastOpen}
        onClose={() => setToastState({ ...toastState, toastOpen: false })}
        message={toastText}
        autoHideDuration={4000}
      />
      <ContextMenu
        open={isColorPickerOpen}
        selected={calColor}
        title="캘린더 색상"
        items={colors}
        onClose={handleColorPickerClose}
        onClick={handleColorClick}
        type="color"
        isColor={false}
      />
    </>
  );
};

export default CalendarSettingView;
