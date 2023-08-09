import { HTTPError } from '@/error';
import { API as CoreAPI } from '@wapl/core';
import { ERROR_STATUS } from '../constants';
import axios from 'axios';

export const isDevelop = process.env.NODE_ENV === 'development';
export const baseUrl = isDevelop
  ? 'https://calendar-dev.deliveryservice.or.kr'
  : process.env.REACT_APP_CALENDAR_API_URL;

export const docsUrlPath =
  process.env.REACT_APP_OFFICE_API_URL ?? 'https://office-api-dev.deliveryservice.or.kr/superoffice';
export const docsEventUrlPath = process.env.REACT_APP_OFFICE_EVENT_URL ?? 'https://-office-cms.deliveryservice.or.kr';

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

export const OfficeAPI = axios.create();
