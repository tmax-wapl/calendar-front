import { useState } from 'react';
import { Checkbox, Icon } from '@wapl/ui';
import { ItemContainer, CheckBoxWrapper, ButtonWarpper } from './Category.style';

const CategoryList = () => {
  const [checkList, setCheckList] = useState<Array<boolean>>([true, false]);
  const categoryItems = [
    { label: '캐릭터A의 캘린더 캐릭터A의 캘린더 캐릭터A의 캘린더', type: 'category', id: 1, color: '#FF46B5' },
    { label: '생일', type: 'category', id: 2, color: '#00C1B1' },
  ];

  return (
    <>
      {categoryItems.map((category, index) => (
        <ItemContainer key={category.id}>
          <CheckBoxWrapper
            calendarcolor={category.color}
            control={
              <Checkbox
                checked={checkList[index]}
                onChange={e =>
                  setCheckList(prevlist => prevlist.map((item, idx) => (idx === index ? e.target.checked : item)))
                }
              />
            }
            label={category.label}
          />
          <ButtonWarpper>
            <Icon.MoreLine width={20} height={20} />
          </ButtonWarpper>
        </ItemContainer>
      ))}
    </>
  );
};

export default CategoryList;
