import React from 'react';
import { Icon } from '@wapl/ui';
import { EventTitleContainer, IconButton, EventTitleInput } from './EventTitle.style';

interface Props {
  title?: string;
  importance?: boolean;
  onTitleChange?: (value: string) => void;
  onImportanceChange?: (value: boolean) => void;
}

const EventTitle = ({ title = '', importance, onTitleChange, onImportanceChange }: Props) => {
  const handleImportanceClick = () => {
    if (!onImportanceChange) return;
    onImportanceChange(!importance);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onTitleChange) return;
    onTitleChange(e.target.value);
  };

  return (
    <EventTitleContainer>
      <IconButton onClick={handleImportanceClick}>
        <Icon.BookmarkFill color={importance ? '#fcbb00' : '#bdc1c6'} width={20} height={20} />
      </IconButton>
      <EventTitleInput
        placeholder="일정 제목을 입력해주세요."
        visibleClear={false}
        value={title}
        limit={50}
        onChange={handleTitleChange}
        autoFocus
      />
    </EventTitleContainer>
  );
};

export default React.memo(EventTitle, (prev, next) => prev.title === next.title && prev.importance === next.importance);
