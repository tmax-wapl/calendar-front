import { HTTPError } from '@/error';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { ERROR_STATUS } from '../constants';
import { ResponseData } from '../constants/interfaces';

const isDevelop = process.env.REACT_APP_MODE === 'local';
const baseUrl = isDevelop
  ? `${window.parent.env?.REACT_APP_CALENDAR_API_URL ?? 'https://calendar.teespace.net'}`
  : `${window.parent.env?.REACT_APP_CALENDAR_API_URL}`;

class APIClass {
  instance;
  token: string | null = null;
  personaId: number | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      config => {
        const headers = config.headers as AxiosRequestHeaders;
        if (this.token) {
          headers.Authorization = `Bearer ${this.token}`;
          headers.Wpid = this.personaId;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      response => {
        const { data } = response;
        return data;
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
  }

  setToken(token: string, personaId: number) {
    this.token = token;
    this.personaId = personaId;
    // local 테스트 용도
  }

  /**
   * HTTP Get 요청
   * @alias module:API
   * @param  {string} url
   * @param  {object} params
   * @return {Promise}
   */
  async get<ResT>(url: string, params?: AxiosRequestConfig): Promise<ResponseData<ResT>> {
    return this.instance.get(url, params || undefined);
  }
  /**
   * HTTP Post 요청
   * @alias module:API
   * @param  {string} url
   * @param  {object} params
   * @param  {object} config
   * @return {Promise}
   */
  async post<ReqT, ResT>(url: string, params: ReqT, config?: AxiosRequestConfig): Promise<ResponseData<ResT>> {
    return this.instance.post(url, params || undefined, config || undefined);
  }
  /**
   * HTTP Put 요청
   * @alias module:API
   * @param  {string} url
   * @param  {object} params
   * @param  {object} config
   * @return {Promise}
   */
  async put(url: string, params: AxiosRequestConfig, config?: AxiosRequestConfig) {
    return this.instance.put(url, params || undefined, config || undefined);
  }
  /**
   * HTTP Delete 요청
   * @alias module:API
   * @param  {string} url
   * @param  {object} params
   * @return {Promise}
   */
  async delete<ResT>(url: string, params?: AxiosRequestConfig): Promise<ResponseData<ResT>> {
    const data = params ? { data: params } : undefined;
    return this.instance.delete(url, data);
  }

  /**
   * HTTP Patch 요청
   * @alias module:API
   * @param  {string} url
   * @param  {object} params
   * @return {Promise}
   */
  async patch<ReqT, ResT>(url: string, params: ReqT, config?: AxiosRequestConfig): Promise<ResponseData<ResT>> {
    return this.instance.patch(url, params || undefined, config || undefined);
  }
}

export const API = new APIClass();
