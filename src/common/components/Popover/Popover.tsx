import React, { Dispatch, useEffect, useState } from 'react';
import { Mui, Icon } from '@wapl/ui';
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
  const { eventStore, uiStore } = useCalendarStores();
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

  const handleEventClick = async (id: string) => {
    const eventInfo = await eventStore.getEventInfo(+id);
    uiStore.setDateDay(eventInfo.startDate.startOf('day'));
    eventStore.setEvent(eventInfo);
    if (!pathname.includes('detail')) navigate(`/main/detail`);
    setAnchorEl(null);
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
                {event.extendedProps.dto.importance && (
                  <Icon.BookmarkFill className="mr-8" width={16} height={16} color="#FCBB00" />
                )}
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
