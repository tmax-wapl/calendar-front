import { useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Checkbox, Icon } from '@wapl/ui';
import { CheckBoxWrapper, SubscriptionButton } from './SubscriptionList.style';

const SubscriptionList = () => {
  const { uiStore } = useCalendarStores();
  const [checkList, setCheckList] = useState<Array<boolean>>([true, true, false]);
  const subscriptionItems = [
    { label: '길동과 친구들 in 괌', type: 'shared', id: 3, color: '#3384FF' },
    { label: 'G 캘린더', type: 'shared', id: 4, color: '#A143FF' },
    { label: 'PL2-2', type: 'shared', id: 5, color: '#FCBB00' },
  ];

  const closeDialog = () => {
    uiStore.inputDialogInfo = null;
  };

  return (
    <>
      <SubscriptionButton
        onClick={() => {
          uiStore.inputDialogInfo = {
            action: 'subscribe',
            onCloseClick: closeDialog,
            onClick: [closeDialog, closeDialog],
            data: { placeholder: 'URL 입력' },
          };
        }}
      >
        <Icon.Add2Line width={20} height={20} className="mr-8" color="#80868B" />
        구독 캘린더 추가
      </SubscriptionButton>
      {subscriptionItems.map((calendar, index) => (
        <CheckBoxWrapper
          key={calendar.id}
          calendarcolor={calendar.color}
          control={
            <Checkbox
              checked={checkList[index]}
              onChange={e =>
                setCheckList(prevlist => prevlist.map((item, idx) => (idx === index ? e.target.checked : item)))
              }
            />
          }
          label={calendar.label}
        />
      ))}
    </>
  );
};

export default SubscriptionList;
