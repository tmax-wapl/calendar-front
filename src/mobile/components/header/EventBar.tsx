import { Icon, Badge } from '@wapl/ui';
import { useCoreStore } from '@wapl/core';
import { EventBarContainer, IconButton, EventBarTitle } from './EventBar.style';

export interface EventBarButton {
  action: 'close' | 'back' | 'share' | 'edit' | 'delete' | 'search' | 'setting' | 'home';
  onClick: () => void;
}

interface Props {
  title?: string;
  leftSide?: EventBarButton[];
  rightSide?: EventBarButton[];
}

const EventBar = ({ title, leftSide = [], rightSide = [] }: Props) => {
  const { notiStore } = useCoreStore();

  const ButtonIcon = {
    close: <Icon.CloseLine width={24} height={24} />,
    back: <Icon.ArrowBackLine width={24} height={24} />,
    share: <Icon.ShareLine width={24} height={24} />,
    edit: <Icon.EditLine width={24} height={24} />,
    delete: <Icon.DeleteLine width={24} height={24} />,
    search: <Icon.SearchLine width={24} height={24} />,
    setting: <Icon.SettingLine width={24} height={24} />,
    home: (
      // @ts-ignore
      <Badge badgeContent={notiStore.unreadCount} variant="dot" size={4} right={-4}>
        <Icon.HomeLine width={24} height={24} />
      </Badge>
    ),
  };

  const Buttons = ({ buttons }: { buttons: EventBarButton[] }) => {
    return (
      <>
        {buttons.map(button => (
          <IconButton key={button.action} onClick={button.onClick}>
            {ButtonIcon[button.action]}
          </IconButton>
        ))}
      </>
    );
  };

  return (
    <EventBarContainer>
      <Buttons buttons={leftSide} />
      <EventBarTitle>{title}</EventBarTitle>
      <Buttons buttons={rightSide} />
    </EventBarContainer>
  );
};

export default EventBar;
