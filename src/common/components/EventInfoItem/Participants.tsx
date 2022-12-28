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

interface Props {
  participants?: any[];
  editable?: boolean;
}

const Participants = ({ participants = [], editable = false }: Props) => {
  const ExpandIcon = (): JSX.Element => {
    if (editable) return <Icon.Add2Line color="#202124" width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#bdbdbd" width={20} height={20} />;
  };

  const handleSummaryClick = () => {
    // TODO: 편집 모드에서 참여 구성원 클릭 시 구성원 추가가 가능하도록 변경
  };

  return (
    <Accordion disableGutters elevation={0} defaultExpanded={!!participants?.length} expanded={editable || undefined}>
      <AccordionSummary expandIcon={<ExpandIcon />} {...(editable && { onClick: handleSummaryClick })}>
        <Icon.UserLine className="mr-8" color="#202124" width={20} height={20} />
        참여 구성원
        {!editable && <ParticipantsCount>&nbsp;{participants?.length}</ParticipantsCount>}
      </AccordionSummary>
      <AccordionDetails editable={editable}>
        {participants.length ? (
          participants.map(participant => (
            <ParticipantChip key={participant.id} label={participant.name} editable={editable} />
          ))
        ) : (
          <ParticipantsPlaceholder>‘참여 구성원’ 혹은 이 곳을 클릭해 주세요.</ParticipantsPlaceholder>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default React.memo(Participants, (prev, next) => prev.participants === next.participants);
