export interface ICollectionTree {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: 'date' | 'user' | 'system' | 'import';
  parent?: number;
  children?: ICollectionTree[];
}
