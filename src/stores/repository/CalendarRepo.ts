import { CalendarDTO } from '@/common/constants/interfaces';
import { API } from '@/common/lib/API';

export default class CalendarRepo {
  async calendarCreate() {
    // for test
    const data = await API.post('/apis/v1/calendars/create', {
      name: 'test',
      url: '',
      color: '#FCBB00',
      type: 'normal',
    });
    console.log(data);
  }

  async getCalendarInfo(calId: number) {
    try {
      const { response, success } = await API.get<CalendarDTO>(`/apis/v1/calendars/${calId}`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
}
