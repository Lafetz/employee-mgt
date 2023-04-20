import express from "express";
import * as taskController from "../controllers/tasks.controllers";
const router = express.Router();
router.get("/", taskController.listTasks);
router.post("/", taskController.addTask);
router.delete("/:taskId", taskController.removeTask);
router.put("/:taskId", taskController.updateTask);

export default router;
