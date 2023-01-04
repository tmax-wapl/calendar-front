import { Mui } from '@wapl/ui';
import { useEffect, useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
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
  const { uiStore } = useCalendarStores();
  const { target, position, color, type, onColorClick } = uiStore.contextClickArg;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    uiStore.contextClickArg = null;
  };

  const handleClick = (color: string) => {
    if (onColorClick) onColorClick(color);
    handleClose();
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
        <ContextMenuItem type={type} />
      </Mui.Menu>
    </div>
  );
};
