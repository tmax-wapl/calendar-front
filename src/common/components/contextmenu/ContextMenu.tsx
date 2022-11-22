import { Mui } from '@wapl/ui';
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
      <Mui.Menu
        anchorEl={anchorEl}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ top: position?.top, left: position?.left }}
        onClose={handleClose}
      >
        <Mui.MenuItem sx={style} disableRipple>
          <ColorPicker color={color} />
        </Mui.MenuItem>
        <div id="contextBody">
          <Mui.MenuItem>
            <div id="menuItem">상황별 메뉴 1</div>
          </Mui.MenuItem>
          <Mui.MenuItem>
            <div id="menuItem">상황별 메뉴 2</div>
          </Mui.MenuItem>
          <Mui.MenuItem>
            <div id="menuItem">상황별 메뉴 3</div>
          </Mui.MenuItem>
        </div>
      </Mui.Menu>
    </div>
  );
};

export default ContextMenu;
