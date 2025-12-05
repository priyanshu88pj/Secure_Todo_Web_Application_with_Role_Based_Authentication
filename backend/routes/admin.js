import express from "express";
import { isAdmin } from "../middleware/role.js";
import {
  getAllUsers,
  getAllTodos,
  updateUserRole
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", isAdmin, getAllUsers);
router.get("/todos", isAdmin, getAllTodos);
router.patch("/users/:id/role", isAdmin, updateUserRole);

export default router;
