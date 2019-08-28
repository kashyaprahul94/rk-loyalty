export interface IApplication {
  boot(): Promise<IApplication>;
}
