export type IHeaderValue = number | string | string[] | boolean | undefined;

interface Header {
  [key: string]: IHeaderValue;
}

export type IHeader = Header | null;
