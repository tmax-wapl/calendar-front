import React from 'react';
import { Avatar, Icon } from '@wapl/ui';
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
import { Member, RoomModel, SearchOrgRes, GetFavoriteOrgRes, ContactData } from '@wapl/core';
interface Props {
  participants?: Partial<EventMemberPersona & EventMemberRoom>[];
  onChange?: (value?: EventMember) => void;
  editable?: boolean;
}

type UniqueKey = { [key: number]: boolean };

const Participants = ({ participants = [], onChange, editable = false }: Props) => {
  const { uiStore, eventStore } = useCalendarStores();
  const ExpandIcon = (): JSX.Element => {
    if (editable) return <Icon.Add2Line width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#bdbdbd" width={20} height={20} />;
  };

  const closeDialog = () => uiStore.setDialogInfo(null);

  const isRoomModel = (roomItem: RoomModel): roomItem is RoomModel => {
    return 'displayName' in roomItem;
  };

  const isSearchOrgRes = (searchOrgItem: SearchOrgRes): searchOrgItem is SearchOrgRes => {
    return !('orgId' in searchOrgItem);
  };

  const convertRoomObj = (item: Partial<RoomModel & SearchOrgRes & GetFavoriteOrgRes>) => {
    switch (true) {
      case isRoomModel(item as RoomModel):
        const { id, displayName, displayPhoto } = item;
        return { roomId: id, roomNick: displayName, displayPhoto };
      case isSearchOrgRes(item as SearchOrgRes):
        const {
          org: { roomId, orgName },
        } = item;
        return { roomId, roomNick: orgName };
      default:
        return {
          roomId: item.roomId,
          roomNick: item.orgName,
          displayPhoto: item.displayPhoto,
        };
    }
  };

  const removeDuplicates = (arr: Partial<EventMemberRoom & EventMemberPersona>[]) => {
    const uniqueIdList = [];
    const roomIds = {} as UniqueKey;
    const personaIds = {} as UniqueKey;

    for (const item of arr) {
      if (isRoom(item) && !roomIds[item.roomId]) {
        roomIds[item.roomId] = true;
        uniqueIdList.push(item);
      } else if (isPersona(item) && !personaIds[item.personaId]) {
        personaIds[item.personaId] = true;
        uniqueIdList.push(item);
      }
    }
    return uniqueIdList;
  };

  const onComplete = (
    personaIdList: Partial<Member & ContactData>[],
    roomIdList: Partial<RoomModel & SearchOrgRes & GetFavoriteOrgRes>[],
  ) => {
    const { eventMember } = eventStore.event;

    const roomList = removeDuplicates([
      ...eventMember.roomList,
      ...roomIdList?.map(item => convertRoomObj(item)),
    ]) as EventMemberRoom[];

    const personaList = removeDuplicates([
      ...eventMember.personaList,
      ...personaIdList?.map(item => {
        return { personaId: item.personaId, personaNick: item.nick ?? item.personaName, displayPhoto: [''] };
      }),
    ]) as EventMemberPersona[];

    onChange({
      roomList,
      personaList,
    });
  };

  const handleShareClick = () => {
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
  const isPersona = (item: Partial<EventMemberRoom & EventMemberPersona>): item is EventMemberPersona => {
    return 'personaId' in item;
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
      <AccordionSummary expandIcon={<ExpandIcon />} {...(editable && { onClick: handleShareClick })}>
        <Icon.UserLine className="mr-8" width={20} height={20} />
        참여 구성원
        {!editable && <ParticipantsCount>&nbsp;{participants?.length}</ParticipantsCount>}
      </AccordionSummary>
      <AccordionDetails editable={editable} isExist={editable && !!participants?.length}>
        {participants.length ? (
          participants.map(participant => {
            participant.displayPhoto = participant.displayPhoto?.map(item =>
              item !== '' && !item.includes(window.location.origin) ? `${window.location.origin}/${item}` : item,
            );
            return (
              <ParticipantChip
                key={participant.roomId || participant.personaId}
                label={participant.personaNick || participant.roomNick}
                avatar={<Avatar imgSrc={participant?.displayPhoto ?? undefined} size={20} />}
                avatarCount={participant.displayPhoto?.length}
                editable={editable}
                {...(editable && { onDelete: () => handleDelete(participant) })}
              />
            );
          })
        ) : (
          <ParticipantsPlaceholder {...(editable && { onClick: handleShareClick })}>
            ‘참여 구성원’ 혹은 이 곳을 클릭해 주세요.
          </ParticipantsPlaceholder>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default React.memo(Participants, (prev, next) => prev.participants === next.participants);
