import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./handlers/error.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

app.use("/", routes);
app.use(errorHandler.internalError);
app.use(errorHandler.routeNotFound);

app.listen(process.env.PORT, async () => {
  console.log(`Engage Backend listening on port ${process.env.PORT}!`);
});
