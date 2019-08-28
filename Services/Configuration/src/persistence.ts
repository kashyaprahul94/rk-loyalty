import { UserPersistence, AddressPersistence } from "./user";

export class PersistenceManager {
  private constructor() {}

  public static async Initialize(): Promise<void> {
    return new Promise((resolve: () => void) => {
      UserPersistence.initialize();
      AddressPersistence.initialize();
      resolve();
    });
  }
}
