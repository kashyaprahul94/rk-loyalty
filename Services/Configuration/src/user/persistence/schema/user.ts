import { ISchema, DataType } from "@rk-loyalty/core";

import { IUser } from "../../types";

import { addressSchema } from "./address";

export const userSchema: ISchema<IUser> = {
  title: "user",
  schema: {
    name: {
      required: false,
      type: DataType.String,
    },
    age: {
      required: true,
      type: DataType.Number,
    },
    address: {
      required: true,
      type: DataType.ObjectId,
      ref: addressSchema.title,
    },
  },
};
