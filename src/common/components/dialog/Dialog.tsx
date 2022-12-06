import React from 'react';
import {
  Dialog as DialogCompo,
  DialogWrapper,
  DialogButtonWrapper,
  DialogTitle,
  DialogContent,
  Button,
} from '@wapl/ui';
import { useCalendarStores } from '../../../stores/StoreProvider';

interface DialogButton {
  variant: 'primary' | 'secondary' | 'secondary-web' | 'third' | 'negative';
  text: string;
  onClick: (() => void) | ((value?: string) => void);
}

export const Dialog = () => {
  const { uiStore } = useCalendarStores();
  const { action, onClick, data } = uiStore.dialogInfo;

  const title = ((): { main?: string; sub?: string } => {
    switch (action) {
      case 'rename':
        return { main: '이름을 변경하시겠습니까?' };
      case 'shareEventDelete':
        return {
          main: '일정 삭제',
          sub: `선택한 ${data?.num}개 일정을 삭제하시겠습니까? \n 삭제 후에는 복구할 수 없으며, \n 공유한 상대방에게도 사라집니다.`,
        };
      case 'eventDelete':
        return {
          main: '일정 삭제',
          sub: `선택한 ${data?.num}개 일정을 삭제하시겠습니까? \n 삭제 후, 복구할 수 없습니다.`,
        };
      case 'shareCalendarDelete':
        return {
          main: '캘린더 삭제',
          sub: `선택한 캘린더를 삭제하시겠습니까? \n 삭제 후에는 복구할 수 없으며, \n 공유한 상대방에게도 사라집니다.`,
        };
      case 'calendarDelete':
        return {
          main: '캘린더 삭제',
          sub: `선택한 캘린더를 삭제하시겠습니까? \n 이 후, 이 캘린더에 접근할 수 없습니다.`,
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
      case 'calendarDelete':
      case 'eventDelete':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'negative', text: '삭제', onClick: onClick[1] },
        ];
      default:
        return [];
    }
  })();

  const handleClose = () => {
    console.log('close');
  };

  return (
    <DialogCompo open={open} onClose={handleClose}>
      <DialogWrapper>
        <DialogTitle>{title?.main}</DialogTitle>
        <DialogContent sx={{ whiteSpace: 'pre-line' }}>{title?.sub}</DialogContent>
      </DialogWrapper>
      <DialogButtonWrapper>
        {buttons?.map((button: DialogButton) => (
          <Button key={button.text} variant={button.variant} onClick={() => button.onClick()}>
            {button.text}
          </Button>
        ))}
      </DialogButtonWrapper>
    </DialogCompo>
  );
};
