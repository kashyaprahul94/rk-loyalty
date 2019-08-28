import { ApplicationRunner } from "@rk-loyalty/core";

import { Application } from "./app";

//
//
//

export const start = async () => ApplicationRunner.Run(Application.Instance());
