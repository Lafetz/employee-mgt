import express from "express";
import * as employeeController from "../controllers/employees.controller";
const router = express.Router();
router.get("/", employeeController.listEmployees);
router.post("/", employeeController.addEmployee);
router.delete("/:employeeId", employeeController.removeEmployee);
router.put("/:employeeId", employeeController.updateEmployee);

export default router;
