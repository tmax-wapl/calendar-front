import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { Icon } from '@wapl/ui';
import { SubscriptionButton } from './SubscriptionList.style';

const SubscriptionList = observer(() => {
  const { uiStore, calendarStore } = useCalendarStores();

  const closeDialog = () => {
    uiStore.dialogInfo = null;
  };

  return (
    <>
      <SubscriptionButton
        onClick={() => {
          uiStore.dialogInfo = {
            action: 'subscribe',
            onCloseClick: closeDialog,
            onClick: [closeDialog, closeDialog],
            data: { placeholder: 'URL 입력' },
            type: 'input',
          };
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
