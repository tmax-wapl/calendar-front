import React, { useEffect, useState } from 'react';
import { Popover } from '@mui/material';
import { EventSegment } from '@fullcalendar/react';

import { ClickArg } from '../../../web/components/body/Calendar';
import {
  EventIcon,
  EventTitle,
  EventWrapper,
  PopoverBody,
  PopoverContainer,
  PopoverHeader,
  PopoverIcon,
  PopoverTitle,
} from '../Popover/Popover.style';

const PopOver = ({ target, date, position, events }: ClickArg) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (target) setAnchorEl(target);
    return () => setAnchorEl(null);
  }, [target]);

  return (
    <Popover
      open={open}
      anchorReference="anchorPosition"
      anchorPosition={{ top: position?.top, left: position?.left }}
      onClose={handleClose}
    >
      <PopoverContainer>
        <PopoverHeader>
          <PopoverTitle>{date}</PopoverTitle>
          <PopoverIcon className="fc-popover-close fc-icon fc-icon-x" onClick={handleClose}></PopoverIcon>
        </PopoverHeader>
        <PopoverBody>
          {events?.map(({ event }: EventSegment) => {
            return (
              <EventWrapper key={event.title}>
                <EventIcon backgroundColor={event.backgroundColor} />
                <EventTitle>{event.title}</EventTitle>
              </EventWrapper>
            );
          })}
        </PopoverBody>
      </PopoverContainer>
    </Popover>
  );
};

export default PopOver;
