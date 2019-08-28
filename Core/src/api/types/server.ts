export interface IServerOptions {
  port: number;
  hostname: string;
  prefix: string;
  isHTTPs: boolean;
}

export const DefaultServerOptions: IServerOptions = {
  hostname: "localhost",
  isHTTPs: false,
  port: 3099,
  prefix: "/",
};
