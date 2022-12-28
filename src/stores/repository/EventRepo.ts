import { API } from '../../common/lib/API';

export default class EventRepo {
  async getEventList(appId: string, calendarId: string): Promise<any> {
    try {
      const { response, success } = await API.get(`/apis/v1/apps/${appId}/calendars/${calendarId}/events`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
}
