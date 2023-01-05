import React, { Dispatch, useEffect, useState } from 'react';
import { Mui } from '@wapl/ui';
import { EventSegment } from '@fullcalendar/react';
import { ClickArg } from '@wcomponents/body/Calendar';
import {
  EventIcon,
  EventTitle,
  EventWrapper,
  PopoverBody,
  PopoverContainer,
  PopoverHeader,
  PopoverIcon,
  PopoverTitle,
} from './Popover.style';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';

export interface PopOverProps {
  moreLinkData: ClickArg;
  setMoreLinkData?: Dispatch<React.SetStateAction<ClickArg>>;
}

const PopOver = ({ moreLinkData: { target, events, position, date }, setMoreLinkData }: PopOverProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { eventStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    setMoreLinkData(prev => ({
      ...prev,
      target: null,
    }));
  };

  const handleEventClick = (id: string) => {
    eventStore.eventId = +id;
    if (!pathname.includes('detail')) navigate(`/main/detail`);
  };

  useEffect(() => {
    if (target) setAnchorEl(target);
    return () => setAnchorEl(null);
  }, [target]);

  return (
    <Mui.Popover
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
              <EventWrapper key={event.id} onClick={() => handleEventClick(event.id)}>
                <EventIcon backgroundColor={event.backgroundColor} />
                <EventTitle>{event.title}</EventTitle>
              </EventWrapper>
            );
          })}
        </PopoverBody>
      </PopoverContainer>
    </Mui.Popover>
  );
};

export default PopOver;
