import { Entity, DocumentRepository } from "@rk-loyalty/core";

import { IUser } from "../../types";

import { UserPersistence } from "../entities";

export class UserRepository extends DocumentRepository<IUser> {
  public constructor(entity?: Entity<IUser>) {
    super(entity || UserPersistence.use());
  }
}
