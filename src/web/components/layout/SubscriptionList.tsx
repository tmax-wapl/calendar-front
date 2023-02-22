import { useContext } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { Icon } from '@wapl/ui';
import { SubscriptionButton } from './SubscriptionList.style';
import { HTTPError } from '@/error';

const SubscriptionList = observer(() => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  const handleSubscribe = async (url: string) => {
    try {
      await calendarStore.createCalendar({ regUserId: userId, url, type: 'url' });
      closeDialog();
    } catch (e) {
      if (e instanceof HTTPError && e.status === 400) {
        uiStore.setDialogInfo({
          action: 'subscribeDuplication',
          onClick: [closeDialog],
        });
      } else {
        uiStore.setDialogInfo({
          action: 'subscribeFail',
          onClick: [closeDialog],
        });
      }
    }
  };

  return (
    <>
      <SubscriptionButton
        onClick={() => {
          uiStore.setDialogInfo({
            action: 'subscribe',
            onCloseClick: closeDialog,
            onClick: [closeDialog, handleSubscribe],
            data: { placeholder: 'URL 입력' },
            type: 'input',
          });
        }}
      >
        <Icon.Add2Line width={20} height={20} className="mr-8" color="#80868B" />
        구독 캘린더 추가
      </SubscriptionButton>
      {calendarStore.calendarList
        ?.filter((category: CalendarModel) => category.type === 'url')
        .map((category: CalendarModel) => (
          <Item key={category.id} category={category} />
        ))}
    </>
  );
});

export default SubscriptionList;
