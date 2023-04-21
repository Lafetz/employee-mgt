import express from "express";
import employees from "./routes/employees.route";
import tasks from "./routes/tasks.routes";
import leaves from "./routes/leaves.route";
import * as dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: ["https://lafetz.github.io", "http://localhost:3000"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/employees", employees);
app.use("/tasks", tasks);
app.use("/leaves", leaves);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
