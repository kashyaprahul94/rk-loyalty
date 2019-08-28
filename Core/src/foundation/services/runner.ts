import { IApplication } from "../types";

export class ApplicationRunner {
  private constructor() {}

  public static Run(instance: IApplication): Promise<IApplication> {
    return instance.boot();
  }
}
