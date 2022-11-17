import { useState, useEffect } from 'react';
import { Icon, Select } from '@wapl/ui';
import {
  NotificationsContainer,
  ItemContainer,
  NotificationItem,
  IconButton,
  NotificationAddItem,
  NotificationsTitle,
} from './Notifications.style';

interface Props {
  notifications: string[];
  editable?: boolean;
  onChange?: (data: any[]) => void;
}

interface Unit {
  [key: string]: string;
}

const Notifications = ({ notifications, editable = false, onChange }: Props) => {
  const [data, setData] = useState<typeof notifications>(notifications);
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
  const units: Unit = {
    m: '분',
    h: '시간',
    d: '일,',
  };

  const handleSelectChange = (changedNotification: string, targetIndex: number) => {
    setData(prev => prev.map((notification, index) => (index === targetIndex ? changedNotification : notification)));
  };

  const handleDeleteClick = (targetIndex: number) => {
    // TODO: wapl-ui에 Select prop에 value가 없어서 delete가 제대로 이루어지지 않음. Mui로 다시 만들기.
    setData(prev => prev.filter((_, index) => index !== targetIndex));
  };

  const handleAddClick = () => {
    setData(prev => [...prev, '0']);
  };

  const getNotificationsTitle = (notifications: string[]) => {
    const [time, unit] = notifications[0].split(' ');
    return `${unit ? `${time}${units[unit]} 전` : '일정 당시'} 알림${
      notifications.length > 1 ? ` 외 ${notifications.length - 1}개` : ''
    }`;
  };

  useEffect(() => {
    if (!onChange) return;
    onChange(
      data.map(notification => {
        const [time, unit] = notification.split(' ');
        return { time, unit: unit ?? '' };
      }),
    );
  }, [data, onChange]);

  return (
    <NotificationsContainer>
      <Icon.AlarmOnLine className="mr-8" color="#202124" width={20} height={20} />
      {editable ? (
        <ItemContainer>
          {data?.map((notification, index) => (
            <NotificationItem key={index}>
              <Select
                defaultValue={notification}
                name={`notification${index}`}
                types="normal"
                items={selectItems}
                onChange={notification => handleSelectChange(notification, index)}
              />
              <IconButton onClick={() => handleDeleteClick(index)}>
                <Icon.DeleteFill color="rgba(0, 0, 0, 0.2)" width={20} height={20} />
              </IconButton>
            </NotificationItem>
          ))}
          <NotificationAddItem onClick={handleAddClick}>
            미리 알림 추가
            <Icon.Add2Line color="#202124" width={20} height={20} />
          </NotificationAddItem>
        </ItemContainer>
      ) : (
        <NotificationsTitle>{getNotificationsTitle(notifications)}</NotificationsTitle>
      )}
    </NotificationsContainer>
  );
};

export default Notifications;
