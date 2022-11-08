import API from '../../common/lib/API';

export default class EventRepo {
  API: API;

  constructor() {
    this.API = new API();
  }

  async getEventList(appId: string, calendarId: string): Promise<any> {
    try {
      const res = await this.API.get(`/apis/v1/apps/${appId}/calendars/${calendarId}/events`);
      if (res.status === 200) return res.data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
}
