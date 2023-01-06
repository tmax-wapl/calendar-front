import { Mui } from '@wapl/ui';
import { useEffect, useState, useContext } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { ColorPicker, ContextMenuItem } from './index';

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
  const { uiStore, calendarStore } = useCalendarStores();
  const { target, position, id, color, type } = uiStore.contextClickArg;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    uiStore.setContextClickArg(null);
  };

  const handleClick = async (color: string) => {
    switch (type) {
      case 'persona':
      case 'subscribe':
        await calendarStore.calendarUpdate(id, { userId, color });
        calendarStore.updateCalendarColor(id, color);
        break;
      case 'event':
        // TODO: 일정 색상 변경 서비스 호출
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
