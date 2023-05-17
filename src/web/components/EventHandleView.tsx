import { useState, useEffect, useContext } from 'react';
import { Observer } from 'mobx-react-lite';
import { Icon, Button } from '@wapl/ui';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useRoomStore } from '@wapl/core';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { EventModel } from '@/stores/model/EventModel';
import { EventHandleViewContainer, EventHandleContainer, FromInfo, ButtonGroup } from './EventHandleView.style';
import EventBar from './EventBar';
import {
  EventTitle,
  EventDate,
  RepeatInfo,
  Participants,
  Location,
  Notifications,
  Description,
  Attachments,
} from '@common/components/EventInfoItem';
import { ColorPicker } from '@common/components/ContextMenu';
import { getStartDate, toISO, isSameDate, applyWeekdayOffset } from '@/utils';
import { EVENT_UPDATE_OPTION, VIEW_MODE, APP_ID } from '@/common/constants';
import { useDidMountEffect } from '@/common/hooks';
import { AttachmentInfo, EventMember } from '@/common/constants/interfaces';
import { UploadFileDTO, SyncFileDTOMsg, FileInfo } from '@/common/constants/interfaces';

interface Props {
  action: 'create' | 'update';
}

interface OutletProps {
  setEventUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventHandleView = ({ action }: Props) => {
  const { calendarStore, eventStore, uiStore, fileStore } = useCalendarStores();
  const roomStore = useRoomStore();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userId } = useContext(CalendarContext);
  const { setEventUpdating } = useOutletContext<OutletProps>();
  const [originEvent, setOriginEvent] = useState(new EventModel({ ...eventStore.event.dto }));

  const uploadFile = async (file: FileInfo) => {
    try {
      const myRoomId = roomStore.myRoom.id;
      const { fileInfo } = file;
      const dto: UploadFileDTO = {
        roomId: myRoomId,
        targetFolderId: null,
        userIds: [String(userId)],
        roleIds: [5],
        fileSize: fileInfo.size,
      };
      const tempId = Math.random().toString(36).substring(2, 16);
      const res = await fileStore.uploadFile(fileInfo, dto, tempId).then(value => {
        if (value) {
          const SyncFileDTOMsg: SyncFileDTOMsg = {
            type: 0,
            objectId: [JSON.stringify(value)],
            objectType: 1,
            producerId: 'waplcalendar',
          };
          fileStore.syncOfficeFile({
            appIdFrom: APP_ID.CALENDAR.toString(),
            appIdTo: [APP_ID.OFFICE.toString()],
            eventId: 'superdocs',
            eventType: 'websocket_push',
            roomId: myRoomId.toString(),
            senderId: 'waplcalendar',
            message: JSON.stringify(SyncFileDTOMsg),
          });
          return {
            docsFileId: value.documentId,
            fileName: value.documentName,
            fileSize: value.documentSize,
            fileExtension: value.documentExtension,
          };
        }
      });
      return res;
    } catch (e) {
      Array.from(fileStore.uploadInfo.values()).map(info => info.cancelSource.cancel());
      return {};
    }
  };

  const deleteFile = async (originFile: AttachmentInfo) => {
    try {
      if (!eventStore.event.attachments.some(file => file.docsFileId === originFile.docsFileId)) {
        const myRoomId = roomStore.myRoom.id;
        const res = await fileStore.deleteFile({
          deleted: 1,
          objectList: [
            {
              objectId: originFile.docsFileId,
              objectName: originFile.fileName,
              objectExtension: originFile.fileExtension,
            },
          ],
          roomId: eventStore.event.roomId || myRoomId,
        });
        if (res !== 200) {
          console.log('파일 삭제 실패', res);
          return originFile;
        }
        return null;
      }
      return originFile;
    } catch (e) {
      console.log('파일 삭제 실패', e);
      return originFile;
    }
  };

  const preprocessFile = async () => {
    const originFileList = originEvent.attachments.map(originFile =>
      eventStore.event.attachments.some(file => file.docsFileId === originFile.docsFileId) ? originFile : {},
    );
    const uploadPromiseList = eventStore.fileList.map(file => {
      return uploadFile(file);
    });
    // const deletePromiseList = originEvent.attachments.map(originFile => {
    //   return deleteFile(originFile);
    // });
    // const res = await Promise.all(
    //   [...uploadPromiseList, ...deletePromiseList].map(promise => promise.catch(err => null)),
    // );
    const res = await Promise.all(uploadPromiseList.map(promise => promise.catch(err => null)));
    eventStore.setFileList([]);
    return [...res, ...originFileList].filter(file => file !== null);
  };

  const preprocessEvent = async (event: EventModel): Promise<EventModel> => {
    const startDate = event.allDay ? event.startDate.startOf('day') : event.startDate;
    return new EventModel({
      ...event.dto,
      ...(!event.title && { title: 'Untitled' }),
      ...(event.allDay && {
        start: toISO(startDate.toUTC()),
        end: toISO(event.endDate.startOf('day').plus({ days: 1 }).toUTC()),
      }),
      ...(event.rrule && {
        ...(event.rrule.freq === 2 && {
          rrule: applyWeekdayOffset(event.rrule, startDate, 'UTC').toString(),
        }),
        ...(event.repeatEndDate && {
          repeatEndDate: toISO(event.allDay ? event.repeatEndDate.startOf('day').toUTC() : event.repeatEndDate.toUTC()),
        }),
      }),
      ...{ fileList: await preprocessFile() },
    });
  };

  const handleCreate = async () => {
    setEventUpdating(prev => !prev);
    navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
    if (!eventStore.event.calId) eventStore.event.calId = calendarStore.getCalendarId();
    try {
      await eventStore.createEvent(await preprocessEvent(eventStore.event));
    } catch (e) {
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
    } finally {
      setEventUpdating(prev => !prev);
    }
    uiStore.changeDateRange();
  };

  const updateEvent = async (isRepeat = false) => {
    setEventUpdating(prev => !prev);
    navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
    try {
      await eventStore.updateEvent(
        +eventStore.event.id,
        await preprocessEvent(eventStore.event),
        isRepeat ? EVENT_UPDATE_OPTION.ALL_REPEAT_EVENT : EVENT_UPDATE_OPTION.DEFAULT,
      );
    } catch (e) {
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
    } finally {
      setEventUpdating(prev => !prev);
    }
    uiStore.changeDateRange();
  };

  const updateRepeatEvent = async (value: string) => {
    setEventUpdating(prev => !prev);
    switch (value) {
      case 'one': // 이 일정만 수정
        const originStart = originEvent.startDate.toUTC().toFormat('yyyy-LL-dd');
        const newStart = eventStore.event.startDate.toUTC().toFormat('yyyy-LL-dd');
        navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
        try {
          await eventStore.updateEvent(
            +eventStore.event.id,
            await preprocessEvent(new EventModel({ ...eventStore.event.dto, id: null })),
            EVENT_UPDATE_OPTION.ONCE_REPEAT_EVENT,
            originStart !== newStart ? originStart : null,
          );
        } catch (e) {
          navigate(`/main/view-mode/${uiStore.viewMode}/date`);
        } finally {
          setEventUpdating(prev => !prev);
        }
        break;
      case 'after': // 이 일정 및 향후 일정 수정
        navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
        try {
          await eventStore.updateEvent(
            +eventStore.event.id,
            await preprocessEvent(new EventModel({ ...eventStore.event.dto, id: null })),
            EVENT_UPDATE_OPTION.AFTER_REPEAT_EVENT,
            originEvent.startDate.toUTC().toFormat('yyyy-LL-dd'),
          );
        } catch (e) {
          navigate(`/main/view-mode/${uiStore.viewMode}/date`);
        } finally {
          setEventUpdating(prev => !prev);
        }
        break;
      case 'all': // 모든 일정 수정
        updateEvent(true);
        break;
      default:
        break;
    }
    uiStore.setDialogInfo(null);
    setEventUpdating(prev => !prev);
    uiStore.changeDateRange();
  };

  const handleUpdate = async () => {
    const originStartDate = originEvent.startDate.toFormat('yyyy-LL-dd');
    const { rrule: originRRuleStr, repeatEndDate: originRepeatEnd } = originEvent.dto;
    const newStartDate = eventStore.event.startDate.toFormat('yyyy-LL-dd');
    const { rrule: newRRuleStr, repeatEndDate: newRepeatEnd } = eventStore.event.dto;

    if (!newRRuleStr) updateEvent();
    else if (!originRRuleStr && newRRuleStr) updateEvent(true);
    else if (originStartDate !== newStartDate && (originRRuleStr !== newRRuleStr || originRepeatEnd !== newRepeatEnd))
      updateRepeatEvent('after');
    else {
      uiStore.setDialogInfo({
        action: 'repeatEventUpdate',
        onClick: [(): void => uiStore.setDialogInfo(null), updateRepeatEvent],
        data: {
          selectType:
            originStartDate !== newStartDate
              ? 'hideAll'
              : originRRuleStr !== newRRuleStr || originRepeatEnd !== newRepeatEnd
              ? 'hideOne'
              : 'hideNone',
        },
        type: 'select',
      });
    }
  };

  const isMonth = (): boolean => uiStore.viewMode === VIEW_MODE.MONTH || !eventStore.event.startDate.isValid;

  useEffect(() => {
    if (action === 'create') {
      const start = isMonth() ? getStartDate(uiStore.dateDay).toUTC() : eventStore.event.startDate.toUTC();
      const calId = calendarStore.getCalendarId();
      eventStore.setEvent(
        new EventModel({
          calId: calId,
          start: toISO(start),
          end: toISO(start.plus({ minutes: 30 })),
        }),
      );
      setOriginEvent(new EventModel({ ...eventStore.event.dto }));
      return;
    }
    if (!eventStore.event.id) {
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
      return;
    }
    if (eventStore.event.allDay) {
      const startDate = eventStore.event.startDate.set({ hour: 9, minute: 0 });
      eventStore.event.startDate = startDate;
      eventStore.event.endDate = eventStore.event.endDate.plus({ days: -1 }).set({ hour: 9, minute: 30 });
      if (eventStore.event.repeatEndDate)
        eventStore.event.repeatEndDate = eventStore.event.repeatEndDate.set({ hour: 9, minute: 0 });
      setOriginEvent(new EventModel({ ...eventStore.event.dto }));
      return;
    }
  }, [action]);

  const isModified = () => {
    const { event } = eventStore;
    return (Object.keys(event.dto) as Array<keyof typeof event.dto>).find(key => {
      if ((!event.dto[key] && !originEvent.dto[key]) || key === 'repeatStartDate') return false;
      if (['start', 'end', 'repeatEndDate'].includes(key))
        return event.allDay
          ? !isSameDate(DateTime.fromISO(event.dto[key] as string), DateTime.fromISO(originEvent.dto[key] as string))
          : event.dto[key] !== originEvent.dto[key];
      return JSON.stringify(event.dto[key]) !== JSON.stringify(originEvent.dto[key]);
    });
  };

  const preventRefresh = (e: BeforeUnloadEvent) => {
    if (!isModified()) return;
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventRefresh, {});
    return () => window.removeEventListener('beforeunload', preventRefresh);
  }, [originEvent]);

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  const handleReset = () => {
    eventStore.setEvent(new EventModel({ ...originEvent.dto }));
    closeDialog();
  };

  useDidMountEffect(() => {
    if (!state) return;
    if (state?.isModify && isModified()) {
      uiStore.setDialogInfo({
        action: 'refresh',
        onClick: [closeDialog, handleReset],
      });
    }
  }, [state]);

  const handleClose = () => {
    if (!isModified()) {
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
      return;
    }
    uiStore.setDialogInfo({
      action: 'refresh',
      onClick: [
        closeDialog,
        () => {
          eventStore.setFileList([]);
          navigate(`/main/view-mode/${uiStore.viewMode}/date`);
          closeDialog();
        },
      ],
    });
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!!target.closest('.fc-event-main') && isModified()) handleClose();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  });

  return (
    <EventHandleViewContainer>
      <EventBar
        title={action === 'create' ? '새 일정' : '일정 수정'}
        leftSide={[{ action: 'close', onClick: handleClose }]}
      />
      <EventHandleContainer>
        <Observer>
          {() => (
            <EventTitle
              title={eventStore.event.title}
              importance={eventStore.event.importance}
              onTitleChange={value => (eventStore.event.title = value)}
              onImportanceChange={value => (eventStore.event.importance = value)}
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <EventDate
              allDay={eventStore.event.allDay}
              start={eventStore.event.startDate}
              end={eventStore.event.endDate}
              onAllDayChange={value => (eventStore.event.allDay = value)}
              onStartChange={value => (eventStore.event.startDate = value)}
              onEndChange={value => (eventStore.event.endDate = value)}
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <RepeatInfo
              rrule={eventStore.event.rrule}
              startDate={eventStore.event.startDate}
              defaultEndDate={eventStore.event.startDate?.plus({ years: 1 })}
              repeatEndDate={eventStore.event.repeatEndDate}
              onRRuleChange={value => (eventStore.event.rrule = value)}
              onStartChange={value => (eventStore.event.repeatStartDate = value)}
              onEndChange={value => (eventStore.event.repeatEndDate = value)}
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <FromInfo>
              <Icon.CalendarLine className="mr-8" width={20} height={20} />
              <ColorPicker
                color={eventStore.event.color}
                iterationCount={8}
                rowGap={6}
                columnGap={8}
                onClick={color => (eventStore.event.color = color)}
              />
            </FromInfo>
          )}
        </Observer>
        <Observer>
          {() => (
            <Participants
              participants={
                eventStore.event.eventMember
                  ? [...eventStore.event.eventMember?.personaList, ...eventStore.event.eventMember?.roomList]
                  : []
              }
              onChange={(value: EventMember) => (eventStore.event.eventMember = value)}
              editable
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <Location
              location={eventStore.event.location}
              onChange={value => (eventStore.event.location = value)}
              editable
            />
          )}
        </Observer>
        {/* <Observer>
          {() => (
            <Notifications
              notifications={eventStore.event.notifications}
              onChange={value => (eventStore.event.notifications = value)}
              editable
            />
          )}
        </Observer> */}
        <Observer>
          {() => (
            <Description
              description={eventStore.event.description}
              onChange={value => (eventStore.event.description = value)}
              editable
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <Attachments
              attachments={eventStore.event.attachments}
              editable
              setFileInfo={list => eventStore.setFileList([...eventStore.fileList, ...list])}
              onFileUpload={value => (eventStore.event.attachments = [...eventStore.event.attachments, ...value])}
              onFileDelete={id => {
                eventStore.event.attachments = eventStore.event.attachments.filter(file => file.docsFileId !== id);
                eventStore.setFileList(eventStore.fileList.filter(file => file.fileId !== id));
              }}
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <ButtonGroup fullWidth>
              <Button variant="secondary" size="large" onClick={handleClose}>
                취소
              </Button>
              {action === 'create' ? (
                <Button
                  size="large"
                  onClick={handleCreate}
                  disabled={
                    eventStore.event.startDate > eventStore.event.endDate ||
                    eventStore.event.startDate > eventStore.event.repeatEndDate
                  }
                >
                  생성
                </Button>
              ) : (
                <Button
                  size="large"
                  onClick={handleUpdate}
                  disabled={
                    eventStore.event.startDate > eventStore.event.endDate ||
                    eventStore.event.startDate > eventStore.event.repeatEndDate
                  }
                >
                  수정
                </Button>
              )}
            </ButtonGroup>
          )}
        </Observer>
      </EventHandleContainer>
    </EventHandleViewContainer>
  );
};

export default EventHandleView;
