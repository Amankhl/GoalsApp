import express from "express";

const app = express();

app.use(express.json())   // for parsing json req into object
app.use(express.urlencoded({ extended: false }));  // for parsing html form data req into object

import goalRoutes from "./routes/goal.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler)

export { app }
