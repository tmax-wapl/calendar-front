import { Dispatch, SetStateAction } from 'react';
import { Icon, Mui } from '@wapl/ui';
import { NotificationItemContainer, IconButton, NotificationLabel } from './NotificationItem.style';
import { NotificationItems } from '@/common/constants';
import Select from '../Select/Select';
import { useCalendarStores } from '@/stores/StoreProvider';

interface Props {
  index: number;
  notification: string;
  isMobile: boolean;
  onChange?: (changedNotification: string, targetIndex: number) => void;
  onDelete?: (index: number) => void;
  setTargetIndex?: Dispatch<SetStateAction<number>>;
  setSelected?: Dispatch<SetStateAction<string>>;
}

const NotificationItem = ({
  index,
  notification,
  onChange,
  isMobile,
  onDelete,
  setTargetIndex,
  setSelected,
}: Props) => {
  const { uiStore } = useCalendarStores();
  const openPicker = () => {
    uiStore.setPickerInfo('notification');
    setSelected(notification);
    setTargetIndex(index);
  };

  const NotificationContent = () => {
    return !isMobile ? (
      <Mui.FormControl size="small">
        <Select value={notification || '0'} items={NotificationItems} onChange={value => onChange(value, index)} />
      </Mui.FormControl>
    ) : (
      <NotificationLabel onClick={openPicker}>
        {NotificationItems.find(({ value }) => value === notification)?.label}
      </NotificationLabel>
    );
  };

  return (
    <NotificationItemContainer isMobile={isMobile}>
      <NotificationContent />
      <IconButton onClick={() => onDelete(index)} isMobile={isMobile}>
        <Icon.DeleteFill color="rgba(0, 0, 0, 0.2)" width={20} height={20} />
      </IconButton>
    </NotificationItemContainer>
  );
};

export default NotificationItem;
