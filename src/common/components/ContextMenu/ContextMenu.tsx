import { Mui } from '@wapl/ui';
import { useContext, useEffect, useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { ColorPicker, ContextMenuItem } from './index';
import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { EventModel } from '@/stores/model/EventModel';
import { CalendarModel } from '@/stores';

const style = [
  {
    '&:hover': {
      color: 'white',
      backgroundColor: 'white',
    },
    '&:focus-visible': {
      color: 'white',
      backgroundColor: 'white',
    },
  },
];

export const ContextMenu = () => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore, eventStore } = useCalendarStores();
  const { target, position, id, color, hideColorPicker, type, date, data } = uiStore.contextClickArg;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    uiStore.setContextClickArg(null);
  };

  const handleColorClick = async (color: string) => {
    const calColor = color || calendarStore.defaultColor;
    switch (type) {
      case 'mainCalendar':
      case 'subCalendar':
      case 'subscribe':
      case 'sharedEventCalendar':
        await calendarStore.updateCalendar(id, { color });
        calendarStore.updateCalendarDTO(id, 'color', color);
        if (type === 'sharedEventCalendar') {
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
        uiStore.setContextClickArg({ ...uiStore.contextClickArg, color });
        break;
      case 'repeatEvent':
      case 'event':
        const event = new EventModel({ color, calId: calendarStore.getCalendarId() });
        await eventStore.updateEvent(id, event, EVENT_UPDATE_OPTION.DEFAULT);
        eventStore.updateEventColor('' + id, color);
        uiStore.setContextClickArg({ ...uiStore.contextClickArg, color });
        break;
      case 'orgCalendar':
      case 'roomCalendar':
        data.dto.color = color;
        calendarStore.addLocalRoomCalendarItem(userId, data.dto);

        const roomEventList = calendarStore.eventList.map(event =>
          event.roomId === id ? new EventModel({ ...event.dto, calColor }) : event,
        );
        calendarStore.setEventList(roomEventList);
        uiStore.setContextClickArg({ ...uiStore.contextClickArg, color });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (target) setAnchorEl(target);
  }, [target]);

  return (
    <div id="contextWrapper">
      <Mui.Menu
        anchorEl={anchorEl}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ top: position?.top, left: position?.left }}
        onClose={handleClose}
      >
        {!hideColorPicker && (
          <Mui.MenuItem sx={style} disableRipple>
            <ColorPicker color={color} onClick={color => handleColorClick(color)} />
          </Mui.MenuItem>
        )}
        <ContextMenuItem id={id} type={type} date={date} onClose={handleClose} />
      </Mui.Menu>
    </div>
  );
};
