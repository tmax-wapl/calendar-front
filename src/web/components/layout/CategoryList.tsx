import { CalendarModel } from '@/stores/model/CalendarModel';
import { useCalendarStores } from '@/stores/StoreProvider';
import Item from './Item';
import { CategoryListContainer, Title } from './CategoryList.style';
import { observer } from 'mobx-react-lite';

const CategoryList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <CategoryListContainer>
      <Title>내 캘린더</Title>
      {calendarStore.calendarList
        ?.filter((category: CalendarModel) => category.type === null)
        .map((category: CalendarModel) => (
          <Item key={category.id} category={category} />
        ))}
    </CategoryListContainer>
  );
});

export default CategoryList;
