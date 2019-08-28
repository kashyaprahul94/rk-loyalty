import { IApplication } from "@rk-loyalty/core/build/foundation";

import { APIServer } from "@rk-loyalty/core/build/api";
import { DBManager } from "@rk-loyalty/core/build/persistence";

import { Config } from "../config";

import { PersistenceManager } from "./persistence";

import { UserAPI } from "./user";

//
//
//

export class Application implements IApplication {
  //
  //
  private static _instance: Application;
  private config: Config;

  private constructor() {
    this.config = Config.Instance();
  }

  private async init() {
    //
    //

    await this.initDB();

    //

    await this.initPersistenceUnits();

    //

    await this.initAPIServer();

    //

    return this;
  }

  private async initDB() {
    await DBManager.Connect(this.config.mongoConnection);
    return this;
  }

  private async initPersistenceUnits() {
    await PersistenceManager.Initialize();
    return this;
  }
  private async initAPIServer() {
    const server = await new APIServer();
    server.addRoute(new UserAPI().routes());
    await server.boot();
    return this;
  }

  public async boot() {
    try {
      this.init();
    } catch (e) {
      console.error(e);
    }

    return this;
  }

  public static Instance(): Application {
    if (!Application._instance) {
      Application._instance = new Application();
    }
    return Application._instance;
  }
}
