import { Mui } from '@wapl/ui';
import { useContext, useEffect, useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { ColorPicker, ContextMenuItem } from './index';
import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { EventModel } from '@/stores/model/EventModel';

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
  const { target, position, id, color, type } = uiStore.contextClickArg;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    uiStore.setContextClickArg(null);
  };

  const handleClick = async (color: string) => {
    switch (type) {
      case 'mainCalendar':
      case 'subCalendar':
      case 'subscribe':
        await calendarStore.updateCalendar(id, { userId, color });
        calendarStore.updateCalendarColor(id, color);
        const eventList = calendarStore.eventList.map(event =>
          event.calId === id ? new EventModel({ ...event.dto, calColor: color }) : event,
        );
        calendarStore.setEventList(eventList);
        break;
      case 'event':
        // TODO: 일정 색상 변경 서비스 호출
        const event = new EventModel({ modUserId: userId, color, calId: 145 });
        await eventStore.updateEvent(id, event, EVENT_UPDATE_OPTION.DEFAULT);
        eventStore.updateEventColor('' + id, color); // 일정 model은 string 타입이군
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
        <Mui.MenuItem sx={style} disableRipple>
          <ColorPicker color={color} onClick={color => handleClick(color)} />
        </Mui.MenuItem>
        <ContextMenuItem id={id} type={type} onClose={handleClose} />
      </Mui.Menu>
    </div>
  );
};
