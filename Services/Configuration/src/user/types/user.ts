import { IDocument } from "@rk-loyalty/core";

import { IAddress } from "./address";

export interface IUser extends IDocument {
  name: string;
  age: number;
  address: IAddress;
}
