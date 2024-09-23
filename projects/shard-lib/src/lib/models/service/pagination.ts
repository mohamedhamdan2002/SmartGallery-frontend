import { Service } from "./service";

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Service[];
}

