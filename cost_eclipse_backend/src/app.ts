import express, { Application } from "express";
import welcomeRoute from "./routes/welcome.route";

const app: Application = express();

app.use(express.json());
app.use("/", welcomeRoute);

export default app;
