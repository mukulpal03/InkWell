import app from "./App";
import { config } from "./config/env";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
