export type SortingOrder = 'asc' | 'ascending' | 'desc' | 'descending';

export type UserRecordsReq = {
  page?: number;
  limit?: number;
  sorting?: string;
  order?: SortingOrder;
  fullInfo?: boolean;
};

interface UserRecordsAuthData {
  email: string;
  isAdmin: boolean;
}

export interface UserRecordsItem {
  username: string;
  records: Record<string, Array<number>>;
  language?: string;
  authData?: UserRecordsAuthData;
}

export interface UserRecordRes {
  items: Array<UserRecordsItem>;
  totalCount: number;
}
