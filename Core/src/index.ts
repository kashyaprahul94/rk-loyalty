import "reflect-metadata";

export * from "./api";
export * from "./foundation";
export * from "./logger";
export * from "./networking";
export * from "./persistence";

import { DBManager } from "./persistence";

import { User, IUser, UserService } from "./user";

(async () => {
  try {
    //

    //

    await DBManager.Connect({
      host: "localhost",
      port: 27017,
      database: "test",
      documents: [User],
    });

    const manager = new UserService();

    const user: IUser = {
      id: "12345_" + Date.now(),
      name: "adlkaslk",
      address: {
        street: "Alexanderstrasse 5",
        postcode: 10179,
      },
      metadata: {
        createdBy: "RAHULIU",
      },
    };

    const _user = await manager.create(user);

    console.info("User saved ", _user);

    await manager.update({ _id: _user._id! }, { name: "1111" });

    console.info("User updated");

    const users = await manager.getDelegate().findOne({
      where: {
        _id: _user._id!,
      },
    });

    console.info(users);
  } catch (e) {
    console.error(e);
  }
})();

/*
import * as mongoose from "mongoose";

import {
  IDocument,
  ISchema,
  DataType,
  Entity,
  DocumentRepository,
} from "./persistence";

//
//
//

interface IAddress extends IDocument {
  street: string;
}

interface IUser extends IDocument {
  name: string;
  age: number;
  address: IAddress;
}

const adressSchema: ISchema<IAddress> = {
  title: "address",
  schema: {
    street: {
      required: true,
      type: DataType.String,
    },
  },
};

const userSchema: ISchema<IUser> = {
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
      type: DataType.ObjectId,
      ref: adressSchema.title,
    },
  },
};

(async () => {
  try {
    //
    //
    const dbConnection = "mongodb://localhost:27017/employee";

    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
    });

    //
    //

    const Address: Entity<IAddress> = new Entity(adressSchema);
    const User: Entity<IUser> = new Entity(userSchema);

    const address = await Address.getModel()
      .delegate()
      .create({
        street: "Left Avenue",
      });

    class UserRepo extends DocumentRepository<IUser> {
      constructor() {
        super(User);
      }
    }

    // tslint:disable-next-line
    class UserService {
      private userRepo: UserRepo;
      constructor() {
        this.userRepo = new UserRepo();
      }

      public async getAll() {
        return this.userRepo.findAll().exec();
      }
      public async create() {
        return this.userRepo.createOne({
          age: 24,
          name: "Doe",
          address: address._id,
          metadata: {
            createdBy: "RAHUL JI",
          },
        });
      }
    }

    const userService = new UserService();

    await userService.create();

    console.info("ban gaya user");

    const users = await userService.getAll();

    console.info(users);
  } catch (e) {
    console.error(e);
  }
})();

 */
