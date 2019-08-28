import { Entity, IEntityWrapper } from "@rk-loyalty/core";

import { IAddress } from "../../types";

import { addressSchema } from "../schema";

export const AddressPersistence: IEntityWrapper<IAddress> = {
  use(): Entity<IAddress> {
    return new Entity(addressSchema);
  },
  initialize(): Entity<IAddress> {
    return new Entity(addressSchema);
  },
};
