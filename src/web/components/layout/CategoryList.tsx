import { CalendarModel } from '@/stores/model/CalendarModel';
import { useCalendarStores } from '@/stores/StoreProvider';
import Item from './Item';
import { observer } from 'mobx-react-lite';

const CategoryList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <>
      {calendarStore.calendarList?.map((category: CalendarModel) => (
        <Item key={category.id} category={category} />
      ))}
    </>
  );
});

export default CategoryList;
