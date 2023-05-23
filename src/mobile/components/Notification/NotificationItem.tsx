import { Icon } from '@wapl/ui';
import {
  NotificationItemWrapper,
  NotificationItemContainer,
  IconButton,
  NotificationLabel,
} from './Notifications.style';
import { NotificationItems } from '@/common';

interface Props {
  index: number;
  notification: string;
  setTargetIndex: React.Dispatch<React.SetStateAction<number>>;
  setPickerToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  onDelete?: (index: number) => void;
}

const NotificationItem = ({ index, notification, setTargetIndex, setPickerToggle, setSelected, onDelete }: Props) => {
  const openPicker = () => {
    setPickerToggle(true);
    setSelected(notification);
    setTargetIndex(index);
  };

  return (
    <NotificationItemContainer>
      <NotificationItemWrapper>
        <NotificationLabel onClick={openPicker}>
          {NotificationItems.find(({ value }) => value === notification)?.label}
        </NotificationLabel>
        <IconButton onClick={() => onDelete(index)}>
          <Icon.DeleteFill width={20} height={20} />
        </IconButton>
      </NotificationItemWrapper>
    </NotificationItemContainer>
  );
};

export default NotificationItem;
