import { useState } from 'react';
import { Icon } from '@wapl/ui';
import { DescriptionContainer, ItemTitleContainer, DescriptionTextarea } from './Description.style';

interface Props {
  description: string;
  editable?: boolean;
}

const Description = ({ description, editable = false }: Props) => {
  const [data, setData] = useState<typeof description>(description);

  // TODO: editor로 변경
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  return (
    <DescriptionContainer>
      <ItemTitleContainer>
        <Icon.EditingTextalignLeftLine className="mr-8" color="#202124" width={20} height={20} />
        설명
      </ItemTitleContainer>
      <DescriptionTextarea value={data} placeholder="설명 추가" onChange={handleTextareaChange} readOnly={!editable} />
    </DescriptionContainer>
  );
};

export default Description;
