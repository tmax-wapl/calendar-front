import React, { useState } from 'react';
import { Icon } from '@wapl/ui';
import { DescriptionContainer, ItemTitleContainer, DescriptionTextarea } from './Description.style';

interface Props {
  description?: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

const Description = ({ description = '', onChange, editable = false }: Props) => {
  const [value, setValue] = useState<typeof description>('');

  // TODO: editor로 변경
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e.target.value);
    setValue(e.target.value);
  };

  return (
    <DescriptionContainer>
      <ItemTitleContainer>
        <Icon.EditingTextalignLeftLine className="mr-8" width={20} height={20} />
        설명
      </ItemTitleContainer>
      <DescriptionTextarea
        value={description || value}
        placeholder="설명 추가"
        onChange={handleTextareaChange}
        readOnly={!editable}
        editable={editable}
      />
    </DescriptionContainer>
  );
};

export default React.memo(Description, (prev, next) => prev.description === next.description);
