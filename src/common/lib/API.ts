import axios, { AxiosInstance } from 'axios';

interface APIInstance extends AxiosInstance {
  get: (url: string, queryString?: any) => Promise<any>;
  post: (url: string, payload?: any, config?: any) => Promise<any>;
  put: (url: string, payload?: any, config?: any) => Promise<any>;
  delete: (url: string, config?: any) => Promise<any>;
}

const baseUrl = 'https://calendar.teespace.net';
class APIClass {
  instance: APIInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  public async get(url: string, config?: any) {
    const res = await this.instance.get(url, config);
    return res;
  }

  public async post(url: string, payload?: any, config?: any) {
    const res = await this.instance.post(url, payload, config);
    return res;
  }

  public async put(url: string, payload?: any, config?: any) {
    const res = await this.instance.put(url, payload, config);
    return res;
  }

  public async delete(url: string, config?: any) {
    const res = await this.instance.delete(url, config);
    return res;
  }
}

export const API = new APIClass();
