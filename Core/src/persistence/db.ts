import { createConnection, ConnectionOptions } from "typeorm";

/* tslint:disable:ban-types */
const Connect = ({
  host,
  port,
  database,
  documents = [],
}: {
  host: string;
  port: number;
  database: string;
  documents: Function[];
}) => {
  const _options: ConnectionOptions = {
    type: "mongodb",
    host,
    port,
    database,
  };
  return createConnection({
    ..._options,
    ...{
      entities: documents,
      useNewUrlParser: true,
    },
  });
};

export const DBManager = {
  Connect,
};
