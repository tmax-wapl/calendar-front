import { Icon, useWaplUiStore, Mui } from '@wapl/ui';
import { useEffect, useRef, useState, memo, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { ColorItem as colors } from '@/common';
import { HTTPError } from '@/error';
import EventBar from '../header/EventBar';
import {
  CalendarSettingViewContainer,
  CalendarName,
  IconWrapper,
  Input,
  SettingItem,
  DotIcon,
} from './CalendarSettingView.style';
import { ColorItemContent } from '../ColorPicker/ColorPicker.style';
import { CalendarModel, EventModel } from '@/stores';
import { ContextMenu } from '../ContextMenu';

const CalendarSettingView = observer(() => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();
  const {
    toast: { notify },
  } = useWaplUiStore();
  const { id, roomId, name, type, mainFlag, color, subscribeStatus } = calendarStore.calendar;
  const calColor = colors.some(item => item.color === color) ? color : '';
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isColorPickerOpen, setColorPickerOpen] = useState<boolean>(false);
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

  const handleBack = () => {
    uiStore.setPageDialogInfo('calendarManage');
  };

  const handleColorPickerOpen = () => setColorPickerOpen(true);

  const handleColorPickerClose = () => setColorPickerOpen(false);

  const ColorItem = memo(({ color, label }: { color?: string; label?: string }) => (
    <ColorItemContent>
      <Icon.CalendarDotFill color={color} width={20} height={20} />
      <span>{label}</span>
    </ColorItemContent>
  ));

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

  const handleCalendarSync = async () => {
    try {
      const { start, end } = uiStore.dateRange;
      const iCalendar = await calendarStore.syncCalendar(id, start, end);
      if (iCalendar.subscribeStatus === 'success') notify(`${iCalendar.name} 캘린더 동기화가 성공하였습니다.`);
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
    handleBack();
  };

  const handleCalendarDelete = () => {
    uiStore.setDialogInfo({
      action: type === 'url' ? 'subscriptionDelete' : 'calendarDelete',
      onClick: [closeDialog, deleteCalendar],
    });
  };

  const deleteRoomCalendar = async () => {
    const newRoomList = calendarStore.roomCalendarList
      ?.filter((room: CalendarModel) => room.roomId !== roomId)
      .map(room => room.dto);
    calendarStore.setLocalRoomCalendarList(userId, newRoomList);
    closeDialog();
    handleBack();
    uiStore.changeDateRange();
  };

  const handleRoomCalendarDelete = () => {
    uiStore.setDialogInfo({
      action: 'roomCalendarDelete',
      onClick: [closeDialog, deleteRoomCalendar],
    });
  };

  const closeDialog = () => uiStore.setDialogInfo(null);

  return (
    <>
      <EventBar title="캘린더 설정" leftSide={[{ action: 'back', onClick: handleBack }]} />
      <CalendarSettingViewContainer>
        {isEdit ? (
          <Input
            id="input"
            ref={inputRef}
            variant="filled"
            visibleClear
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
            <IconWrapper>
              {type === 'url' && (
                <>{subscribeStatus !== 'success' && <Icon.ErrorLine width={20} height={20} color=" #F44336" />}</>
              )}
              {!['share', 'org'].includes(type) && (
                <Mui.IconButton onClick={() => setEdit(true)}>
                  <Icon.EditLine color="#BDC1C6" width={20} height={20} />
                </Mui.IconButton>
              )}
            </IconWrapper>
          </CalendarName>
        )}
        <SettingItem onClick={handleColorPickerOpen}>
          <DotIcon color={calColor || ''} width={20} height={20} className="mr-8" />
          {colors.find(color => color.value === calColor).label}
        </SettingItem>
      </CalendarSettingViewContainer>
      <ContextMenu
        open={isColorPickerOpen}
        selected={calColor}
        title="캘린더 색상"
        items={colors}
        onClose={handleColorPickerClose}
        onClick={handleColorClick}
        Component={ColorItem}
        isColor={false}
      />
    </>
  );
});

export default CalendarSettingView;
