import axios, { AxiosInstance } from 'axios';
import { IImportFile } from './IImportFile';
import { IPhoto } from 'Seisai/Store/Photos/IPhoto';

export class ImportService {
  private client: AxiosInstance;
  private sessionId?: number;
  private queue: Promise<void>;

  constructor() {
    this.client = axios.create();

    this.queue = this.startSession();
  }

  public queueFileForImport(
    file: IImportFile,
    onUploadProgress?: (event: ProgressEvent) => void,
  ) {
    const { promise, resolve, reject } = this.createDeferred<IPhoto>();

    const cb = async () => {
      if (!this.sessionId) {
        // This should never happen, however we put it here
        // to be on the safe side.
        const error = new Error('Session ID should be set');
        reject(error);
        throw error;
      }

      const data = new FormData();
      data.append('file', file.handle);

      try {
        const res = await this.client.post<IPhoto>(
          `/imports/${this.sessionId}/photos`,
          data,
          {
            onUploadProgress,
          },
        );

        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    };

    this.queue.then(cb);

    return promise;
  }

  private createDeferred<T>(): {
    promise: Promise<T>;
    resolve: (result: T) => void;
    reject: (err: Error) => void;
  } {
    // Noop and awkward assignment here is due to
    // https://github.com/microsoft/TypeScript/issues/11498
    const noop = () => {};

    let resolve: (result?: any) => void = noop;
    let reject: (reason?: Error) => void = noop;

    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return { promise, resolve, reject };
  }

  private async startSession() {
    const response = await this.client.post('/imports');

    this.sessionId = response.data.sessionId;
  }
}
