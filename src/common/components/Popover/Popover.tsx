import React, { useEffect, useState } from 'react';
import { Popover } from '@mui/material';
import { EventSegment } from '@fullcalendar/react';

import {
  EventIcon,
  EventTitle,
  EventWrapper,
  PopoverBody,
  PopoverContainer,
  PopoverHeader,
  PopoverIcon,
  PopoverTitle,
} from './PopOver.style';
import { MoreLink } from '../../../web/components/body/Calendar';

const PopOver = ({ data }: { data: MoreLink }) => {
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (data?.target) setAnchorEl(data?.target);

    return () => setAnchorEl(null);
  }, [data?.target]);

  return (
    <Popover
      open={open}
      anchorReference="anchorPosition"
      anchorPosition={{ top: data?.position?.top, left: data?.position?.left }}
      onClose={handleClose}
    >
      <PopoverContainer>
        <PopoverHeader>
          <PopoverTitle>{data?.date}</PopoverTitle>
          <PopoverIcon className="fc-popover-close fc-icon fc-icon-x" onClick={handleClose}></PopoverIcon>
        </PopoverHeader>
        <PopoverBody>
          {data?.events?.map(({ event }: EventSegment) => {
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
