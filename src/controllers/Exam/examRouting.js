import express from "express"
import * as examController from "./examController.js"
import { asyncHandler } from "../../utilis/ErrorHandling.js"
import { fileType, fileUpload } from "../../utilis/multer.js"
import { authMiddleware, roles } from "../../middleWare/authMiddleware.js"
const router = express.Router()

router.post("/",authMiddleware([roles.TEACHER]), asyncHandler(examController.createExam))
router.get("/:id", asyncHandler(authMiddleware([roles.STUDENT, roles.TEACHER])), asyncHandler(examController.getSpecificExam))
router.delete("/:id", asyncHandler(examController.deleteSpecificExam))
router.put("/:id/edit", asyncHandler(examController.editExam))
router.get("/:id/students", asyncHandler(examController.getAllStudentsSubmitedTheExam))




export default router