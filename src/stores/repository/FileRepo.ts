import { UploadFileDTO, DeleteFileDTO, SyncFileDTO } from '@/common/constants/interfaces';
import { API, OfficeAPI, URL } from '@/common/lib/API';
import { HTTPError } from '@/error';
import { CancelToken } from 'axios';

export default class FileRepo {
  async uploadFile(file: File, dto: UploadFileDTO, cancelToken: CancelToken) {
    try {
      const form = new FormData();
      form.append('file', file);
      const blob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
      form.append('input', blob);
      const { data } = await API.post(`${URL().docsUrl}/document/upload`, form, { cancelToken });
      return data;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }

  async deleteFile(dto: DeleteFileDTO) {
    try {
      const { status } = await API.post(`${URL().docsUrl}/document/delete`, dto);
      return status;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }

  async syncOfficeFile(dto: SyncFileDTO) {
    try {
      const common = API.instance.defaults.headers.common;
      const auth = common.Authorization;
      const res = await OfficeAPI.post(`${URL().docsEventUrl}/apis/v1/events/websockets`, dto, {
        headers: {
          authorization: auth,
        },
      });
      return res;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }
}
