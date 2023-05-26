import React, { memo, useState } from 'react';
import { ContextMenu, Icon } from '@wapl/ui';
import {
  NotificationsContainer,
  ItemContainer,
  NotificationAddItem,
  NotificationsTitle,
  Label,
  ItemContent,
} from './Notifications.style';
import NotificationItem from './NotificationItem';
import EventBar from '@/mobile/components/header/EventBar';
import { BodyWrapper, ContentWrapper, ItemWrapper, Selected } from '@/mobile/components/common/styles/common.style';
import { NotificationItems } from '@/common/constants';

interface Props {
  notifications?: string[];
  onChange?: (value: string[]) => void;
  editable?: boolean;
  isMobile?: boolean;
}

interface Unit {
  [key: string]: string;
}

const Notifications = ({ notifications = [], onChange, editable = false, isMobile = false }: Props) => {
  const [pickerToggle, setPickerToggle] = useState(false);
  const [selected, setSelected] = useState('');
  const [targetIndex, setTargetIndex] = useState(0);

  const units: Unit = {
    m: '분',
    h: '시간',
    d: '일',
  };

  const handleClose = () => setPickerToggle(false);

  const handleSelectChange = (changedNotification: string, targetIndex: number) => {
    if (!onChange) return;
    onChange(notifications.map((notification, index) => (index === targetIndex ? changedNotification : notification)));
  };

  const handleNotificationDelete = (targetIndex: number) => {
    if (!onChange) return;
    onChange(notifications.filter((_, index) => index !== targetIndex));
  };

  const handleNotificationAdd = () => {
    if (!isMobile) {
      if (!onChange) return;
      onChange([...notifications, '0']);
    } else {
      setPickerToggle(true);
      setSelected('');
    }
  };

  const handleItemClick = (selectedNotification: string) => {
    if (onChange && !selected) onChange([...notifications, selectedNotification]);
    else handleSelectChange(selectedNotification, targetIndex);
    setPickerToggle(false);
  };

  const NotificationLabel = memo(({ label }: { label: string }) => (
    <ItemContent>
      <Label>{label}</Label>
    </ItemContent>
  ));

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
              isMobile={isMobile}
              notification={notification}
              onChange={handleSelectChange}
              onDelete={handleNotificationDelete}
              {...(isMobile && {
                setTargetIndex: setTargetIndex,
                setPickerToggle: setPickerToggle,
                setSelected: setSelected,
              })}
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

      {isMobile && (
        <ContextMenu open={pickerToggle} onClose={handleClose}>
          <EventBar title={'미리 알림'} leftSide={[{ action: 'close', onClick: handleClose }]} />
          <BodyWrapper>
            <ContentWrapper style={{ padding: '0 18px', minHeight: '575px' }}>
              {NotificationItems.map(({ value, label }: { value: string; label: string }) => (
                <ItemWrapper key={value} onClick={() => handleItemClick(value)}>
                  <NotificationLabel label={label} />
                  <Selected selected={value === selected} />
                </ItemWrapper>
              ))}
            </ContentWrapper>
          </BodyWrapper>
        </ContextMenu>
      )}
    </NotificationsContainer>
  );
};

export default React.memo(Notifications, (prev, next) => prev.notifications === next.notifications);
