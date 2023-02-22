import React from 'react';
import { Icon } from '@wapl/ui';
import { NotificationsContainer, ItemContainer, NotificationAddItem, NotificationsTitle } from './Notifications.style';
import NotificationItem from './NotificationItem';

interface Props {
  notifications?: string[];
  onChange?: (value: string[]) => void;
  editable?: boolean;
}

interface Unit {
  [key: string]: string;
}

const Notifications = ({ notifications = [], onChange, editable = false }: Props) => {
  const units: Unit = {
    m: '분',
    h: '시간',
    d: '일,',
  };

  const handleSelectChange = (changedNotification: string, targetIndex: number) => {
    if (!onChange) return;
    onChange(notifications.map((notification, index) => (index === targetIndex ? changedNotification : notification)));
  };

  const handleNotificationDelete = (targetIndex: number) => {
    if (!onChange) return;
    onChange(notifications.filter((_, index) => index !== targetIndex));
  };

  const handleNotificationAdd = () => {
    if (!onChange) return;
    onChange([...notifications, '0']);
  };

  const getNotificationsTitle = (notifications: string[]) => {
    const [time, unit] = notifications[0].split(' ');
    return `${unit ? `${time}${units[unit]} 전` : '일정 당시'} 알림${
      notifications.length > 1 ? ` 외 ${notifications.length - 1}개` : ''
    }`;
  };

  return (
    <NotificationsContainer>
      <Icon.AlarmOnLine className="mr-8" width={20} height={20} />
      {editable ? (
        <ItemContainer>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              index={index}
              notification={notification}
              onChange={handleSelectChange}
              onDelete={handleNotificationDelete}
            />
          ))}
          {notifications.length < 5 && (
            <NotificationAddItem isEmpty={!notifications.length} onClick={handleNotificationAdd}>
              미리 알림 추가
              <Icon.Add2Line width={20} height={20} />
            </NotificationAddItem>
          )}
        </ItemContainer>
      ) : (
        <NotificationsTitle>{getNotificationsTitle(notifications)}</NotificationsTitle>
      )}
    </NotificationsContainer>
  );
};

export default React.memo(Notifications, (prev, next) => prev.notifications === next.notifications);
