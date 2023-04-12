import RootStore from './RootStore';
import FileRepo from './repository/FileRepo';
import { UploadFileDTO, DeleteFileDTO } from '@/common/constants/interfaces';

export class FileStore {
  rootStore: RootStore;
  repo: FileRepo;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new FileRepo();
  }

  async uploadFile(file: File, dto: UploadFileDTO) {
    const res = await this.repo.uploadFile(file, dto);
    return res;
  }

  async deleteFile(dto: DeleteFileDTO) {
    const res = await this.repo.deleteFile(dto);
    return res;
  }
}
