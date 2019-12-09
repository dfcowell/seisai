import axios, { AxiosInstance } from "axios";
import { IImportFile } from "./IImportFile";

export class ImportService {
  private client: AxiosInstance;
  private sessionId?: number;
  private queue: Promise<void> = Promise.resolve();

  constructor() {
    this.client = axios.create();

    this.startSession = this.startSession.bind(this);
  }

  public queueFileForImport(
    file: IImportFile,
    onUploadProgress?: (event: ProgressEvent) => void
  ) {
    if (!this.sessionId) {
      throw new Error(
        'You must start an import session using "startSession" before enqueueing files'
      );
    }

    const { promise, resolve, reject } = this.createDeferred();

    const cb = async () => {
      const data = new FormData();
      data.append("file", file.handle);

      try {
        const { photoId } = await this.client.post(
          `/imports/${this.sessionId}/photos`,
          data,
          {
            onUploadProgress
          }
        );

        resolve(photoId);
      } catch (err) {
        reject(err);
      }
    };

    this.queue.then(cb);

    return promise;
  }

  public async startSession() {
    const response = await this.client.post("/imports");

    this.sessionId = response.data.sessionId;
  }

  private createDeferred() {
    // Noop and awkward assignment here is due to
    // https://github.com/microsoft/TypeScript/issues/11498
    const noop = () => {};

    let resolve: (result?: any) => void = noop;
    let reject: (reason?: Error) => void = noop;

    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return { promise, resolve, reject };
  }
}
