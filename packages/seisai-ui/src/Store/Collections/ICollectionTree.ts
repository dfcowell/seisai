export interface ICollectionTree {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: "date" | "user" | "system";
  parent?: number;
  children?: ICollectionTree[];
}
