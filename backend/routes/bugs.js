import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import {
    getBugs,
    createBug,
    updateBug,
    deleteBug
} from "../controllers/bugsController.js";

import { bugValidationRules, handleValidationErrors } from "../middlewares/validateBug.js";

const router = express.Router();

router.get("/", getBugs);

// Validacion POST
router.post("/", bugValidationRules, handleValidationErrors, createBug);

// Validacion PUT (admin)
router.put("/:id", authAdmin, bugValidationRules, handleValidationErrors, updateBug);

// DELETE (admin)
router.delete("/:id", authAdmin, deleteBug);

export default router;