import { useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { HTTPError } from '@/error';
import EventBar from '../header/EventBar';
import { UrlSubscribeViewContainer, Input, Description, Footer, AddButton } from './UrlSubscribeView.style';

const UrlSubscribeView = () => {
  const { uiStore, calendarStore } = useCalendarStores();
  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleBackClick = () => {
    uiStore.pageDialogInfo = 'calendarManage';
  };

  const handleSubscribe = async () => {
    try {
      await calendarStore.createCalendar({ url: input, type: 'url' });
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

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  return (
    <>
      <EventBar title="URL로 추가" leftSide={[{ action: 'close', onClick: handleBackClick }]} />
      <UrlSubscribeViewContainer>
        <Input variant="filled" type="text" placeholder="URL 입력" onChange={handleChange} />
        <Description>URL를 통해 다른 캘린더를 추가할 수있습니다.</Description>
      </UrlSubscribeViewContainer>
      <Footer>
        <AddButton variant="primary" disabled={input.trim().length === 0} onClick={handleSubscribe}>
          추가
        </AddButton>
      </Footer>
    </>
  );
};

export default UrlSubscribeView;
