import { Icon } from '@wapl/ui';
import { EventBarContainer, IconButton, EventBarTitle } from './EventBar.style';

interface EventBarButton {
  action: 'close' | 'back' | 'share' | 'edit' | 'delete';
  onClick: () => void;
}

interface Props {
  title?: string;
  leftSide?: EventBarButton[];
  rightSide?: EventBarButton[];
}

const EventBar = ({ title, leftSide = [], rightSide = [] }: Props) => {
  const ButtonIcon = {
    close: <Icon.CloseLine width={20} height={20} />,
    back: <Icon.ArrowBackLine width={20} height={20} />,
    share: <Icon.ShareLine width={20} height={20} />,
    edit: <Icon.EditLine width={20} height={20} />,
    delete: <Icon.DeleteLine width={20} height={20} />,
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
