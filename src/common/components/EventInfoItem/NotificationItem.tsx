import { Icon, Select } from '@wapl/ui';
import { NotificationItemContainer, IconButton } from './NotificationItem.style';

interface Props {
  index: number;
  notification: string;
  onChange?: (changedNotification: string, targetIndex: number) => void;
  onDelete?: (index: number) => void;
}

const NotificationItem = ({ index, notification, onChange, onDelete }: Props) => {
  const selectItems = [
    { label: '일정 당시', value: '0' },
    { label: '5분 전', value: '5 m' },
    { label: '10분 전', value: '10 m' },
    { label: '15분 전', value: '15 m' },
    { label: '30분 전', value: '30 m' },
    { label: '1시간 전', value: '1 h' },
    { label: '2시간 전', value: '2 h' },
    { label: '1일 전', value: '1 d' },
    { label: '2일 전', value: '2 d' },
  ];

  return (
    <NotificationItemContainer>
      <Select
        name="notification"
        defaultValue={notification || '0'}
        types="normal"
        items={selectItems}
        width="100px"
        onChange={(value: string) => onChange(value, index)}
      />
      <IconButton onClick={() => onDelete(index)}>
        <Icon.DeleteFill color="rgba(0, 0, 0, 0.2)" width={20} height={20} />
      </IconButton>
    </NotificationItemContainer>
  );
};

export default NotificationItem;
