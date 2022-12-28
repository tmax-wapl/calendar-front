import React from 'react';
import { Icon } from '@wapl/ui';
import { EventTitleContainer, IconButton, EventTitleInput } from './EventTitle.style';

interface Props {
  title?: string;
  importance?: boolean;
  onChange?: (value: { title?: string; importance?: boolean }) => void;
}

const EventTitle = ({ title = '', importance, onChange }: Props) => {
  const handleImportanceClick = () => {
    if (!onChange) return;
    onChange({ importance: !importance });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange({ title: e.target.value });
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
        onChange={handleTitleChange}
      />
    </EventTitleContainer>
  );
};

export default React.memo(EventTitle, (prev, next) => prev.title === next.title && prev.importance === next.importance);
