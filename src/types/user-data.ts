export interface UserData {
  language: language;
  records: Record<string, Array<number>>
}

export type theme = 'green' |'red' | 'yellow';
export type language = 'en_us' | 'ru' | 'uk' | 'es_es';
