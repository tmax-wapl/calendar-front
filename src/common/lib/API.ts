import { HTTPError } from '@/error';
import { API as CoreAPI } from '@wapl/core';
import { ERROR_STATUS } from '../constants';

export const isDevelop = process.env.NODE_ENV === 'development';
export const baseUrl = isDevelop
  ? `${window.parent.env?.REACT_APP_CALENDAR_API_URL ?? 'https://calendar.teespace.net'}`
  : `${window.parent.env?.REACT_APP_CALENDAR_API_URL}`;

export const SettingInstance = (() => {
  CoreAPI.instance.interceptors.response.use(
    // 동일한 instance 공유하다보니 custom 수정하면 공통 서비스 콜에서 에러
    response => {
      return response;
    },
    async error => {
      const { response } = error;

      if (response) {
        const status = response.status;
        const message = ERROR_STATUS[status];

        throw new HTTPError(status, message);
      }
    },
  );

  const setToken = (token: string, personaId: number) => {
    CoreAPI.setHeader('Authorization', 'Bearer ' + token);
    CoreAPI.setHeader('Wpid', personaId);
  };

  return {
    CoreAPI,
    setToken,
  };
})();

export const API = SettingInstance.CoreAPI;
