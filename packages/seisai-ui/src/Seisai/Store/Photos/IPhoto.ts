type Metadata = {
  [key: string]: Metadata | string | number;
};

export interface IPhoto {
  id: number;
  created: Date;
  updated: Date;
  originalFilename: string;
  title: string;
  description: string;
  metadata: Metadata;
  size: number;
}
