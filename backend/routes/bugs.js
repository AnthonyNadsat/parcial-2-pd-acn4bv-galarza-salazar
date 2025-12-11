import express from "express";
import {
    getBugs,
    createBug,
    updateBug,
    deleteBug
} from "../controllers/bugsController.js";
import { bugValidationRules, handleValidationErrors } from "../middlewares/validateBug.js";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getBugs);

router.post("/", verifyToken, bugValidationRules, handleValidationErrors, createBug);

router.put("/:id", verifyTokenAndAdmin, bugValidationRules, handleValidationErrors, updateBug);
router.delete("/:id", verifyTokenAndAdmin, deleteBug);

export default router;