import { UploadFileDTO, DeleteFileDTO } from '@/common/constants/interfaces';
import { API, docsUrlPath } from '@/common/lib/API';
import { HTTPError } from '@/error';

export default class FileRepo {
  async uploadFile(file: File, dto: UploadFileDTO) {
    try {
      const form = new FormData();
      form.append('file', file);
      const blob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
      form.append('input', blob);
      const { data } = await API.post(`${docsUrlPath}/document/upload`, form);
      return data;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }

  async deleteFile(dto: DeleteFileDTO) {
    try {
      const { status } = await API.post(`${docsUrlPath}/document/delete`, dto);
      return status;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }
}
