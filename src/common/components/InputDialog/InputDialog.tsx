import { Dialog, Button, Icon } from '@wapl/ui';
import { Title, CloseButton, Input, SubTitle, DialogButtonWrapper } from './InputDialog.style';
import { useCalendarStores } from '@/stores/StoreProvider';

interface DialogButton {
  variant: 'primary' | 'secondary' | 'secondary-web' | 'third' | 'negative';
  text: string;
  onClick: (() => void) | ((value?: string) => void);
}

export const InputDialog = () => {
  const { uiStore } = useCalendarStores();
  const { action, onCloseClick, onClick, data } = uiStore.inputDialogInfo;

  const title = ((): { main?: string; sub?: string } => {
    switch (action) {
      case 'subscribe':
        return {
          main: '구독 캘린더 추가',
          sub: `URL을 통해 공유 받은 캘린더에 외부 캘린더를 추가할 수 있습니다.`,
        };
      default:
        return {};
    }
  })();

  const buttons = ((): DialogButton[] => {
    switch (action) {
      case 'subscribe':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'negative', text: '추가', onClick: onClick[1] },
        ];
      default:
        return [];
    }
  })();

  return (
    <Dialog open>
      <Title>
        {title?.main}
        <CloseButton onClick={onCloseClick}>
          <Icon.CloseLine />
        </CloseButton>
      </Title>
      <div>
        <Input variant="filled" visibleClear={false} placeholder={data?.placeholder} />
        <SubTitle>{title?.sub}</SubTitle>
      </div>
      <DialogButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button key={button.text} variant={button.variant} onClick={() => button.onClick()}>
            {button.text}
          </Button>
        ))}
      </DialogButtonWrapper>
    </Dialog>
  );
};
