import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  dragTask
} from "../controller/taskController.js";

const router = express.Router();



router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/drag", authMiddleware, dragTask);
export default router;
