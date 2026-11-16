import app from "./app.js";
import { env } from "./config/index.js";

app.listen(env.port, () => {
  console.log(`Bloom API is running on http://localhost:${env.port}`);
});
