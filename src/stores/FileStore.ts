import RootStore from './RootStore';
import FileRepo from './repository/FileRepo';
import { UploadFileDTO, DeleteFileDTO } from '@/common/constants/interfaces';
import axios, { CancelTokenSource } from 'axios';

export class FileStore {
  rootStore: RootStore;
  repo: FileRepo;
  uploadInfo = new Map<string, { cancelSource: CancelTokenSource }>();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new FileRepo();
  }

  async uploadFile(file: File, dto: UploadFileDTO, tempId: string) {
    const source = axios.CancelToken.source();
    this.uploadInfo.set(tempId, { cancelSource: source });
    const res = await this.repo.uploadFile(file, dto, source.token);
    if (res) this.uploadInfo.delete(tempId);
    return res;
  }

  async deleteFile(dto: DeleteFileDTO) {
    const res = await this.repo.deleteFile(dto);
    return res;
  }
}
