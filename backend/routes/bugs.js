import express from "express";
import {
    getBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug,
    getMyBugs
} from "../controllers/bugsController.js";
import { bugValidationRules, handleValidationErrors } from "../middlewares/validateBug.js";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/", getBugs);
router.get("/:id", getBugById);


router.get("/user/my-bugs", verifyToken, getMyBugs);  // ← NUEVA RUTA
router.post("/", verifyToken, bugValidationRules, handleValidationErrors, createBug);


router.put("/:id", verifyToken, bugValidationRules, handleValidationErrors, updateBug);
router.delete("/:id", verifyToken, deleteBug);

export default router;