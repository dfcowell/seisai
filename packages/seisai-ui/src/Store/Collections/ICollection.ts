export interface ICollection {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: "date" | "user" | "system";
  parent?: number;
  children?: number[];
}
