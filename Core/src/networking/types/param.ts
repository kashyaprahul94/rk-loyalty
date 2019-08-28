export type IParamValue = number | string | boolean;

interface Param {
  [key: string]: IParamValue;
}
export type IParam = Param | null;
