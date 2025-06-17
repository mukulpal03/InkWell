import app from "./App";
import { config } from "./config/env";
import connectToDB from "./libs/db";

const PORT = config.PORT;

connectToDB().then(() =>
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
);
