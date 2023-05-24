import { Icon, Mui } from '@wapl/ui';
import { NotificationItemContainer, IconButton } from './NotificationItem.style';
import Select from '../Select/Select';
import { NotificationItems } from '@/common/constants';

interface Props {
  index: number;
  notification: string;
  onChange?: (changedNotification: string, targetIndex: number) => void;
  onDelete?: (index: number) => void;
}

const NotificationItem = ({ index, notification, onChange, onDelete }: Props) => {
  return (
    <NotificationItemContainer>
      <Mui.FormControl size="small">
        <Select value={notification || '0'} items={NotificationItems} onChange={value => onChange(value, index)} />
      </Mui.FormControl>
      <IconButton onClick={() => onDelete(index)}>
        <Icon.DeleteFill color="rgba(0, 0, 0, 0.2)" width={20} height={20} />
      </IconButton>
    </NotificationItemContainer>
  );
};

export default NotificationItem;
