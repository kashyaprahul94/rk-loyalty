import { IBaseAPIRequest } from "@rk-loyalty/core";

import { IUser } from "./user";

export interface UserRequest extends IBaseAPIRequest {
  body: IUser;
  params: {
    id: string;
  };
}
