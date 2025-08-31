import app from "./app";
import config from "./config/env.config";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});
