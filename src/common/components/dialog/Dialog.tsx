import { Dialog as DialogCompo, Button } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Title, SubTitle, Description, DialogButtonWrapper } from './Dialog.style';
import { InputDialog } from './InputDialog';

export interface DialogButton {
  variant: 'primary' | 'secondary' | 'secondary-web' | 'third' | 'negative';
  text: string;
  onClick: (() => void) | ((value?: string) => void);
}

export const Dialog = () => {
  const { uiStore } = useCalendarStores();
  const { action, onCloseClick, onClick, data, type } = uiStore.dialogInfo;

  const title = ((): { title?: string; subTitle?: string; description?: string } => {
    switch (action) {
      case 'rename':
        return { subTitle: '이름을 변경하시겠습니까?' };
      case 'shareEventDelete':
        return {
          title: '일정 삭제',
          subTitle: `선택한 ${data?.num}개 일정을 삭제하시겠습니까?`,
          description: `삭제 후에는 복구할 수 없으며, \n 공유한 상대방에게도 사라집니다.`,
        };
      case 'eventDelete':
        return {
          title: '일정 삭제',
          subTitle: `선택한 ${data?.num}개 일정을 삭제하시겠습니까?`,
          description: `삭제 후, 복구할 수 없습니다.`,
        };
      case 'calendarDelete':
        return {
          title: '캘린더 삭제',
          subTitle: `선택한 캘린더를 삭제하시겠습니까?`,
          description: `삭제 후에는 복구할 수 없으며, \n공유한 상대방에게도 사라집니다.`,
        };
      case 'subscriptionDelete':
        return {
          title: '캘린더 삭제',
          subTitle: `선택한 캘린더를 삭제하시겠습니까?`,
          description: `이 후, 이 캘린더에 접근할 수 없습니다.`,
        };
      case 'subscribe':
        return {
          title: '구독 캘린더 추가',
          description: `URL을 통해 공유 받은 캘린더에 외부 캘린더를 추가할 수 있습니다.`,
        };
      default:
        return {};
    }
  })();

  const buttons = ((): DialogButton[] => {
    switch (action) {
      case 'rename':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'negative', text: '변경', onClick: onClick[1] },
        ];
      case 'shareEventDelete':
      case 'eventDelete':
      case 'subscriptionDelete':
      case 'calendarDelete':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'negative', text: '삭제', onClick: onClick[1] },
        ];
      case 'subscribe':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'negative', text: '추가', onClick: onClick[1] },
        ];
      default:
        return [];
    }
  })();

  const handleClose = () => {
    console.log('close');
  };

  return type !== 'input' ? (
    <DialogCompo open onClose={handleClose}>
      <Title>{title?.title}</Title>
      <SubTitle>{title?.subTitle}</SubTitle>
      <Description>{title?.description}</Description>
      <DialogButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button key={button.text} variant={button.variant} onClick={() => button.onClick()}>
            {button.text}
          </Button>
        ))}
      </DialogButtonWrapper>
    </DialogCompo>
  ) : (
    <InputDialog open title={title} onCloseClick={onCloseClick} placeholder={data?.placeholder} buttons={buttons} />
  );
};
