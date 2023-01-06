import { useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Checkbox, Icon } from '@wapl/ui';
import { ItemContainer, CheckBoxWrapper, SubscriptionButton, ButtonWarpper } from './SubscriptionList.style';

const SubscriptionList = () => {
  const { uiStore } = useCalendarStores();
  const [checkList, setCheckList] = useState<boolean[]>([true, true, false]);
  const subscriptionItems = [
    { label: '길동과 친구들 in 괌 길동과 친구들 in 괌', type: 'shared', id: 3, color: '#3384FF' },
    { label: 'G 캘린더', type: 'shared', id: 4, color: '#A143FF' },
    { label: 'PL2-2', type: 'shared', id: 5, color: '#FCBB00' },
  ];

  const closeDialog = () => {
    uiStore.dialogInfo = null;
  };

  const onContextMenuOpen = (e: any, color: string) => {
    e.preventDefault(); // 기존 브라우저 우클릭 동작 제어
    const target = e.target;
    if (!target) return;

    uiStore.contextClickArg = {
      target,
      position: { top: e.clientY, left: e.clientX },
      color,
      type: 'subscribe',
    };
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
      {subscriptionItems.map((calendar, index) => (
        <ItemContainer key={calendar.id} onContextMenu={e => onContextMenuOpen(e, calendar.color)}>
          <CheckBoxWrapper
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
          <ButtonWarpper>
            <Icon.RenewLine width={20} height={20} color="#80868B" />
          </ButtonWarpper>
          <ButtonWarpper onClick={e => onContextMenuOpen(e, calendar.color)}>
            <Icon.MoreLine width={20} height={20} />
          </ButtonWarpper>
        </ItemContainer>
      ))}
    </>
  );
};

export default SubscriptionList;
