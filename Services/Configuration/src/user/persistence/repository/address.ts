import { Entity, DocumentRepository } from "@rk-loyalty/core";

import { IAddress } from "../../types";

import { AddressPersistence } from "../entities";

export class AddressRepository extends DocumentRepository<IAddress> {
  public constructor(entity?: Entity<IAddress>) {
    super(entity || AddressPersistence.use());
  }
}
