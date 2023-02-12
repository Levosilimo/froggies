export type SortingOrder = 'asc' | 'ascending' | 'desc' | 'descending';

export type UserRecordsReq = {
  page?: number;
  limit?: number;
  sorting?: string;
  order?: SortingOrder;
};

export interface UserRecordsItem {
  username: string;
  records: Record<string, Array<number>>;
}

export interface UserRecordRes {
  items: Array<UserRecordsItem>;
  totalCount: number;
}
