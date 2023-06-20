import { useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { HTTPError } from '@/error';
import { Icon } from '@wapl/ui';
import EventBar from '../header/EventBar';
import { UrlSubscribeViewContainer, Input, IconButton, Footer, AddButton, Toast } from './UrlSubscribeView.style';

const UrlSubscribeView = () => {
  const { uiStore, calendarStore } = useCalendarStores();
  const [input, setInput] = useState<string>('');
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [calendarStatus, setCalendarStatus] = useState<string>('');

  const handleBackClick = () => {
    uiStore.setPageDialogInfo('calendarManage');
  };

  const handleSubscribe = async () => {
    try {
      await calendarStore.createCalendar({ url: input, type: 'url' });
      handleBackClick();
    } catch (e) {
      if (e instanceof HTTPError && e.status === 400) setCalendarStatus('duplication');
      else setCalendarStatus('fail');
      setToastOpen(true);
    }
  };

  const isError = () => {
    return calendarStatus === 'duplication' || calendarStatus === 'fail';
  };

  return (
    <>
      <EventBar title="공유받은 캘린더 추가" leftSide={[{ action: 'close', onClick: handleBackClick }]} />
      <UrlSubscribeViewContainer>
        <Input
          variant="filled"
          placeholder="URL 입력"
          autoFocus
          visibleClear={false}
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
          helperText="URL를 통해 공유 받은 캘린더를 추가할 수있습니다."
          error={isError()}
          errorMessage={
            calendarStatus === 'duplication' ? '이미 추가된 캘린더 입니다.' : '입력하신 URL을 다시 확인해 주세요.'
          }
          InputProps={{
            endAdornment: (
              <>
                <IconButton onClick={() => setInput('')}>
                  <Icon.DeleteFill width={20} height={20} />
                </IconButton>
                {isError() && (
                  <IconButton>
                    <Icon.Error2Fill width={20} height={20} className="ml-8" />
                  </IconButton>
                )}
              </>
            ),
          }}
        />
      </UrlSubscribeViewContainer>
      <Footer>
        <AddButton variant="primary" disabled={input.trim().length === 0} onClick={handleSubscribe}>
          추가
        </AddButton>
      </Footer>
      <Toast
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="캘린더를 가져올 수 없습니다."
        autoHideDuration={4000}
      />
    </>
  );
};

export default UrlSubscribeView;
