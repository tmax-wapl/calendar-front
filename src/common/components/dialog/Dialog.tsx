import { Dialog as DialogCompo, AlertWrapper, Button } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CustomRoomDTO } from '@/common/constants/interfaces';
import { DesktopRoom } from '@wapl/core';
import { Title, SubTitle, Description, DialogButtonWrapper } from './Dialog.style';
import { InputDialog } from './InputDialog';
import { SelectDialog } from './SelectDialog';
import RoomScheduleDialog from '../RoomScheduleDialog/RoomScheduleDialog';

export interface DialogButton {
  variant: 'primary' | 'secondary' | 'secondary-web' | 'third' | 'negative';
  text: string;
  onClick: (() => void) | ((value?: string | CustomRoomDTO[]) => void);
}

export const Dialog = () => {
  const { uiStore } = useCalendarStores();
  const { action, onCloseClick, onClick, data, type, onComplete } = uiStore.dialogInfo;

  const title = ((): { title?: string; subTitle?: string; description?: string } => {
    switch (action) {
      case 'rename':
        return { subTitle: '이름을 변경하시겠습니까?' };
      case 'shareEventDelete':
        return {
          title: '일정 삭제',
          subTitle: `선택한 공유 일정을 삭제하시겠습니까?`,
          description: `이 후, 이 일정에 접근할 수 없습니다.`,
        };
      case 'eventDelete':
        return {
          title: '일정 삭제',
          subTitle: `선택한 일정을 삭제하시겠습니까?`,
          description: `공유한 상대방에게도 삭제되며,\n삭제 후 복구할 수 없습니다.`,
        };
      case 'repeatEventUpdate':
        return {
          title: '일정 수정',
          subTitle: `이 일정은 반복 설정된 일정입니다.\n 선택한 일정을 수정하시겠습니까?`,
        };
      case 'repeatEventDelete':
        return {
          title: '일정 삭제',
          subTitle: `이 일정은 반복 설정된 일정입니다.\n 선택한 일정을 삭제하시겠습니까?`,
          description: `공유한 상대방에게도 삭제되며,\n 삭제 후 복구할 수 없습니다.`,
        };
      case 'calendarDelete':
        return {
          title: '캘린더 삭제',
          subTitle: `선택한 캘린더를 삭제하시겠습니까?`,
          description: `삭제 후에는 복구할 수 없으며,\n공유한 상대방에게도 사라집니다.`,
        };
      case 'subscriptionDelete':
        return {
          title: '캘린더 삭제',
          subTitle: `선택한 캘린더를 삭제하시겠습니까?`,
          description: `이 후, 이 캘린더에 접근할 수 없습니다.`,
        };
      case 'roomCalendarDelete':
        return {
          title: '캘린더 삭제',
          subTitle: `선택한 캘린더를 삭제하시겠습니까?`,
        };
      case 'subscribe':
        return {
          title: '구독 캘린더 추가',
          description: `URL을 통해 공유 받은 캘린더에 외부 캘린더를 추가할 수 있습니다.`,
        };
      case 'subscribeFail':
        return {
          title: '구독 캘린더 추가 실패',
          description: `입력하신 URL을 다시 확인해 주세요.`,
        };
      case 'subscribeDuplication':
        return {
          title: '구독 캘린더 추가 실패',
          description: `이미 구독 중입니다.`,
        };
      case 'refresh':
        return { subTitle: '변경 사항을 저장하지 않고 나가시겠습니까?' };
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
      case 'repeatEventDelete':
      case 'subscriptionDelete':
      case 'roomCalendarDelete':
      case 'calendarDelete':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'negative', text: '삭제', onClick: onClick[1] },
        ];
      case 'subscribe':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'primary', text: '추가', onClick: onClick[1] },
        ];
      case 'subscribeFail':
      case 'subscribeDuplication':
        return [{ variant: 'primary', text: '확인', onClick: onClick[0] }];
      case 'repeatEventUpdate':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'primary', text: '수정', onClick: onClick[1] },
        ];
      case 'refresh':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'negative', text: '나가기', onClick: onClick[1] },
        ];
      case 'roomSchedule':
        return [
          { variant: 'secondary', text: '취소', onClick: onClick[0] },
          { variant: 'primary', text: '저장', onClick: onClick[1] },
        ];
      default:
        return [];
    }
  })();

  const handleClose = () => {
    console.log('close');
  };

  const DialogType = () => {
    switch (type) {
      case 'input':
        return (
          <InputDialog
            open
            title={title}
            onCloseClick={onCloseClick}
            placeholder={data?.placeholder}
            buttons={buttons}
          />
        );
      case 'select':
        return <SelectDialog open title={title} buttons={buttons} selectType={data?.selectType} />;
      case 'roomSchedule':
        return <RoomScheduleDialog buttons={buttons} onClose={onCloseClick} />;
      case 'roomFriend':
        return (
          <DesktopRoom.MemberSelectorDialog
            open
            onClose={onCloseClick}
            title={data?.title}
            tabs={['org', 'room']}
            confirmBtnText={'공유'}
            onComplete={onComplete}
          />
        );
      default:
        return (
          <DialogCompo open onClose={handleClose}>
            <AlertWrapper>
              <Title>{title?.title}</Title>
              <SubTitle>{title?.subTitle}</SubTitle>
              <Description>{title?.description}</Description>
            </AlertWrapper>
            <DialogButtonWrapper>
              {buttons?.map((button: DialogButton) => (
                <Button key={button.text} variant={button.variant} onClick={() => button.onClick()}>
                  {button.text}
                </Button>
              ))}
            </DialogButtonWrapper>
          </DialogCompo>
        );
    }
  };

  return <>{DialogType()}</>;
};
