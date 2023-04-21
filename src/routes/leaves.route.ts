import express from "express";
import * as leaveController from "../controllers/leaves.controller";
const router = express.Router();
router.get("/", leaveController.listLeaves);
router.post("/", leaveController.addLeave);
router.delete("/:leaveId", leaveController.removeLeave);
router.put("/:leaveId", leaveController.updateLeave);

export default router;
