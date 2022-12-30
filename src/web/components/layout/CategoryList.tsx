import { useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Checkbox, Icon } from '@wapl/ui';
import { ItemContainer, CheckBoxWrapper, ButtonWarpper } from './Category.style';

const CategoryList = () => {
  const { uiStore } = useCalendarStores();
  const [checkList, setCheckList] = useState<Array<boolean>>([true, false]);

  const categoryItems = [
    { label: '캐릭터A의 캘린더 캐릭터A의 캘린더 캐릭터A의 캘린더', type: 'category', id: 1, color: '#FF46B5' },
    { label: '생일', type: 'category', id: 2, color: '#00C1B1' },
  ];

  const onContextMenuOpen = (e: any, color: string) => {
    e.preventDefault(); // 기존 브라우저 우클릭 동작 제어
    const target = e.target;
    if (!target) return;

    uiStore.contextClickArg = {
      target,
      position: { top: e.clientY, left: e.clientX },
      color,
      type: 'persona',
    };
  };

  return (
    <>
      {categoryItems.map((category, index) => (
        <ItemContainer key={category.id} onContextMenu={e => onContextMenuOpen(e, category.color)}>
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
          <ButtonWarpper onClick={e => onContextMenuOpen(e, category.color)}>
            <Icon.MoreLine width={20} height={20} />
          </ButtonWarpper>
        </ItemContainer>
      ))}
    </>
  );
};

export default CategoryList;
