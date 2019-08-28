import { IDocument } from "@rk-loyalty/core";

export interface IAddress extends IDocument {
  street: string;
  postcode: number;
}
