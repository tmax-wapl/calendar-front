import { Icon, Mui, useTheme } from '@wapl/ui';
import { NotificationItemContainer, IconButton, StyledSelect, StyledMenuItem } from './NotificationItem.style';

interface Props {
  index: number;
  notification: string;
  onChange?: (changedNotification: string, targetIndex: number) => void;
  onDelete?: (index: number) => void;
}

const NotificationItem = ({ index, notification, onChange, onDelete }: Props) => {
  const { Color } = useTheme();
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

  const ArrowIcon = (props: any) => <Icon.ArrowBottomLine width={16} height={16} color={Color.Gray[900]} {...props} />;

  return (
    <NotificationItemContainer>
      <Mui.FormControl size="small">
        <StyledSelect
          value={notification || '0'}
          onChange={e => onChange(e.target.value, index)}
          IconComponent={ArrowIcon}
        >
          {selectItems.map(item => (
            <StyledMenuItem key={item.value} value={item.value}>
              {item.label}
            </StyledMenuItem>
          ))}
        </StyledSelect>
      </Mui.FormControl>
      <IconButton onClick={() => onDelete(index)}>
        <Icon.DeleteFill color="rgba(0, 0, 0, 0.2)" width={20} height={20} />
      </IconButton>
    </NotificationItemContainer>
  );
};

export default NotificationItem;
