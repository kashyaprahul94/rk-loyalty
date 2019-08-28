import * as dotenv from "dotenv";

import { resolve } from "path";
import { env } from "process";

export class Config {
  //
  //
  private static _instance: Config;

  public mongoConnection: string;

  private constructor() {
    this.init();

    this.mongoConnection = env.MONGO_CONNECTION || "";
  }

  private init() {
    dotenv.config();

    let path: string;

    switch (process.env.NODE_ENV) {
      case "test":
        path = resolve(__dirname, ".env.test");
        break;
      case "production":
        path = resolve(__dirname, ".env.production");
        break;
      default:
        path = resolve(__dirname, ".env.development");
    }

    dotenv.config({ path });
  }

  public static Instance(): Config {
    if (!Config._instance) {
      Config._instance = new Config();
    }
    return Config._instance;
  }
}
