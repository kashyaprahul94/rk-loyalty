import { Entity, IEntityWrapper } from "@rk-loyalty/core";

import { IUser } from "../../types";

import { userSchema } from "../schema";

export const UserPersistence: IEntityWrapper<IUser> = {
  use(): Entity<IUser> {
    return new Entity(userSchema);
  },
  initialize(): Entity<IUser> {
    return new Entity(userSchema);
  },
};
