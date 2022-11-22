import { MenuItem } from '@mui/material';
import { Menu } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ClickArg } from '../../../web/components/body/Calendar';
import ColorPicker from '../Contextmenu/ColorPicker';

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

const ContextMenu = ({ target, position, color }: ClickArg) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (target) setAnchorEl(target);
  }, [target]);

  return (
    <div id="contextWrapper">
      <Menu
        anchorEl={anchorEl}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ top: position?.top, left: position?.left }}
        onClose={handleClose}
      >
        <MenuItem sx={style} disableRipple>
          <ColorPicker color={color} />
        </MenuItem>
        <div id="contextBody">
          <MenuItem>
            <div id="menuItem">상황별 메뉴 1</div>
          </MenuItem>
          <MenuItem>
            <div id="menuItem">상황별 메뉴 2</div>
          </MenuItem>
          <MenuItem>
            <div id="menuItem">상황별 메뉴 3</div>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default ContextMenu;
