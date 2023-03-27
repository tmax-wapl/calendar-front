import React from 'react';
import { Icon } from '@wapl/ui';
import {
  Accordion,
  AccordionSummary,
  ParticipantsCount,
  AccordionDetails,
  ParticipantChip,
  ParticipantsPlaceholder,
} from './Participants.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EventMember, EventMemberPersona, EventMemberRoom } from '@constants/interfaces';
import { Member, RoomModel, SearchOrgRes, GetFavoriteOrgRes } from '@wapl/core';
interface Props {
  participants?: Partial<EventMemberPersona & EventMemberRoom>[];
  onChange?: (value?: EventMember) => void;
  editable?: boolean;
}

const Participants = ({ participants = [], onChange, editable = false }: Props) => {
  const { uiStore, eventStore } = useCalendarStores();
  const ExpandIcon = (): JSX.Element => {
    if (editable) return <Icon.Add2Line width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#bdbdbd" width={20} height={20} />;
  };

  const closeDialog = () => uiStore.setDialogInfo(null);

  const onComplete = (
    personaIdList: Partial<Member>[],
    roomIdList: Partial<RoomModel & SearchOrgRes & GetFavoriteOrgRes>[],
  ) => {
    let roomList = roomIdList.map(item => {
      return { roomId: item.id, roomNick: item.displayName };
    });
    let personaList = personaIdList.map(item => {
      return { personaId: item.personaId, personaNick: item.nick };
    });
    if (eventStore.event.eventMember) {
      roomList = [...eventStore.event.eventMember.roomList, ...roomList] as EventMemberRoom[];
      personaList = [...eventStore.event.eventMember.personaList, ...personaList] as EventMemberPersona[];
    }
    onChange({ roomList, personaList });
  };

  const handleSummaryClick = () => {
    uiStore.setDialogInfo({
      type: 'roomFriend',
      data: { title: '일정 공유' },
      onComplete,
      onCloseClick: closeDialog,
    });
  };

  const isRoom = (item: Partial<EventMemberRoom & EventMemberPersona>): item is EventMemberRoom => {
    return 'roomId' in item;
  };

  const handleDelete = (item: Partial<EventMemberRoom & EventMemberPersona>) => {
    const target = isRoom(item) ? 'roomList' : 'personaList';
    const targetId = isRoom(item) ? 'roomId' : 'personaId';

    eventStore.event.eventMember[target] = (eventStore.event.eventMember[target] as any).filter(
      (chip: any) => chip[targetId] !== item[targetId],
    );
  };

  return (
    <Accordion disableGutters elevation={0} defaultExpanded={!!participants?.length} expanded={editable || undefined}>
      <AccordionSummary expandIcon={<ExpandIcon />} {...(editable && { onClick: handleSummaryClick })}>
        <Icon.UserLine className="mr-8" width={20} height={20} />
        참여 구성원
        {!editable && <ParticipantsCount>&nbsp;{participants?.length}</ParticipantsCount>}
      </AccordionSummary>
      <AccordionDetails editable={editable}>
        {participants.length ? (
          participants.map(participant => (
            <ParticipantChip
              key={participant.roomId || participant.personaId}
              label={participant.personaNick || participant.roomNick || participant.roomId} // 현재 roomNick 없어서 임시 처리
              editable={editable}
              {...(editable && { onDelete: () => handleDelete(participant) })}
            />
          ))
        ) : (
          <ParticipantsPlaceholder>‘참여 구성원’ 혹은 이 곳을 클릭해 주세요.</ParticipantsPlaceholder>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default React.memo(Participants, (prev, next) => prev.participants === next.participants);
