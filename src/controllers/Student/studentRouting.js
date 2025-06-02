import express from "express"
import * as studentController from "./studentController.js"
import { asyncHandler } from "../../utilis/ErrorHandling.js"
const router = express.Router()

router.post("/", asyncHandler(studentController.getstudentExams))
router.get("/exam/:id", asyncHandler(studentController.getstudentExam))
// router.put("/:id/edit", asyncHandler(studentController.editstudent))




export default router