import axios, { AxiosRequestConfig } from 'axios';
import { ResponseData } from '../constants/interfaces';

const baseUrl = 'http://192.168.151.23:8080';
class APIClass {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.response.use(
      response => {
        const { data } = response;
        return data;
      },
      async error => {
        const { response } = error;

        if (response) {
          const status = response.status;
          const { message } = response.data;

          return Promise.reject({ status, message });
        }
      },
    );
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
  async put(url: string, params: any, config?: AxiosRequestConfig) {
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
