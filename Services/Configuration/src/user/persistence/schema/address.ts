import { ISchema, DataType } from "@rk-loyalty/core";

import { IAddress } from "../../types";

export const addressSchema: ISchema<IAddress> = {
  title: "address",
  schema: {
    street: {
      required: false,
      type: DataType.String,
    },
    postcode: {
      required: true,
      type: DataType.Number,
    },
  },
};
