import { Entity, Column, ObjectID, ObjectIdColumn, Index } from "typeorm";

import {
  IDocument,
  IMetadata,
  AudtiableDocumentRepository,
  Repository,
  GetRepository,
  FindDocumentCriteria,
} from "./persistence";

//
//
//
//

export interface IAddress extends IDocument {
  street: string;
  postcode: number;
}

@Entity()
export class Address implements IAddress {
  @Column()
  public street!: string;

  @Column()
  public postcode!: number;
}

//
//
//
//

export interface IUser extends IDocument {
  id: string;
  name: string;
  address: IAddress;
  metadata?: IMetadata;
}

@Entity()
export class User implements IUser {
  @ObjectIdColumn()
  public _id!: ObjectID;

  @Column()
  public id!: string;

  @Index({
    unique: true,
  })
  @Column({
    unique: true,
  })
  public name!: string;

  @Column(_ => Address)
  public address!: Address;

  @Column()
  public metadata?: IMetadata;

  public constructor(user: IUser) {
    Object.assign(this, user);
  }
}

@Repository(User)
export class UserRepository extends AudtiableDocumentRepository<IUser> {}

export class UserService {
  private delegate: UserRepository;

  public constructor() {
    this.delegate = GetRepository(UserRepository);
  }

  public getDelegate() {
    return this.delegate;
  }

  public async create(user: IUser) {
    return this.delegate.save(user);
  }

  public async update(
    criteria: FindDocumentCriteria<IUser>,
    user: Partial<IUser>,
  ) {
    return this.delegate.update(criteria, user);
  }
}
