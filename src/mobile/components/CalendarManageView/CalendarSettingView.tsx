import { Icon, ContextMenu } from '@wapl/ui';
import { useEffect, useRef, useState, memo, useContext } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { ColorItem as colors } from '@/common';
import EventBar from '../header/EventBar';
import {
  CalendarSettingViewContainer,
  CalendarName,
  IconButton,
  Input,
  SettingItem,
  Divider,
  BodyWrapper,
  ContentWrapper,
  ColorItemContent,
  ColorItemWrapper,
  ColorSelected,
} from './CalendarSettingView.style';
import { EventModel } from '@/stores';

const CalendarSettingView = () => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();
  const { id, roomId, name, type, mainFlag, color: calColor } = calendarStore.calendar;
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isColorPickerOpen, setColorPickerOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(name);
  const inputRef = useRef(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setEdit(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  });

  const handleBackClick = () => {
    uiStore.pageDialogInfo = 'calendarManage';
  };

  const handleColorPickerOpen = () => setColorPickerOpen(true);

  const handleColorPickerClose = () => setColorPickerOpen(false);

  const ColorItem = memo(({ color, label }: { color: string; label: string }) => (
    <ColorItemContent>
      <Icon.CalendarDotFill color={color} width={20} height={20} />
      <span>{label}</span>
    </ColorItemContent>
  ));

  const handleColorClick = async (color: string) => {
    switch (type) {
      case 'org':
      case 'private':
        calendarStore.calendar.color = color;
        calendarStore.addLocalRoomCalendarItem(userId, calendarStore.calendar.dto);
        const roomEventList = calendarStore.eventList.map(event =>
          event.roomId === roomId ? new EventModel({ ...event.dto, calColor: color }) : event,
        );
        calendarStore.setEventList(roomEventList);
        break;
      default:
        await calendarStore.updateCalendar(id, { color });
        calendarStore.updateCalendarDTO(id, 'color', color);
        if (type === 'share') {
          const sharedEventList = calendarStore.eventList.map(event =>
            event.roomId === null && event.shareEvent ? new EventModel({ ...event.dto, calColor: color }) : event,
          );
          calendarStore.setEventList(sharedEventList);
        } else {
          const eventList = calendarStore.eventList.map(event =>
            event.calId === id ? new EventModel({ ...event.dto, calColor: color }) : event,
          );
          calendarStore.setEventList(eventList);
        }
        uiStore.setContextClickArg({ ...uiStore.contextClickArg, color });
        break;
    }
    handleColorPickerClose();
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
            limit={50}
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
            onClear={() => {
              setValue('');
              document.getElementById('input').focus(); // inputRef로 focus 처리하는 방법을 모르겠음..
            }}
          />
        ) : (
          <CalendarName>
            {name}
            {!['share', 'org'].includes(type) && (
              <IconButton onClick={() => setEdit(true)}>
                <Icon.EditLine color="#BDC1C6" width={20} height={20} />
              </IconButton>
            )}
          </CalendarName>
        )}
        <SettingItem onClick={handleColorPickerOpen}>
          <Icon.CalendarDotFill color={calColor || ''} width={20} height={20} className="mr-8" />
          {colors.find(color => color.value === calColor).label || ''}
        </SettingItem>
        <Divider />
        {type === 'url' && (
          <SettingItem>
            <Icon.RenewLine width={20} height={20} className="mr-8" />
            캘린더 동기화
          </SettingItem>
        )}
        {!(mainFlag || ['share', 'org'].includes(type)) && (
          <SettingItem>
            <Icon.DeleteLine width={20} height={20} className="mr-8" />
            캘린더 삭제
          </SettingItem>
        )}
      </CalendarSettingViewContainer>
      <ContextMenu open={isColorPickerOpen} onClose={handleColorPickerClose}>
        <EventBar title="캘린더 색상" leftSide={[{ action: 'close', onClick: handleColorPickerClose }]} />
        <BodyWrapper>
          <ContentWrapper style={{ padding: '0 18px', minHeight: '575px' }}>
            {colors.map(({ color, value, label }: { color: string; value: string; label: string }) => (
              <ColorItemWrapper key={value} onClick={() => handleColorClick(color)}>
                <ColorItem color={color} label={label} />
                <ColorSelected selected={color === calColor} />
              </ColorItemWrapper>
            ))}
          </ContentWrapper>
        </BodyWrapper>
      </ContextMenu>
    </>
  );
};

export default CalendarSettingView;
