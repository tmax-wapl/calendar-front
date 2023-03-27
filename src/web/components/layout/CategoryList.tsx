import { CalendarModel } from '@/stores/model/CalendarModel';
import { useCalendarStores } from '@/stores/StoreProvider';
import Item from './Item';
import { Icon } from '@wapl/ui';
import { CategoryListContainer, Title, AddButton } from './CategoryList.style';
import { observer } from 'mobx-react-lite';

const CategoryList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <CategoryListContainer>
      <Title>
        내 캘린더
        {/* <AddButton>
          <Icon.Add2Line width={20} height={20} color="#80868B" />
        </AddButton> */}
      </Title>
      {calendarStore.calendarList
        ?.filter((category: CalendarModel) => category.type !== 'url' && category.type !== 'share')
        .map((category: CalendarModel) => (
          <Item key={category.id} category={category} />
        ))}
    </CategoryListContainer>
  );
});

export default CategoryList;
