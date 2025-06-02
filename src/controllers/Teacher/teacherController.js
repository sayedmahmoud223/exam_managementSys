import { ResError } from "../../utilis/ErrorHandling.js";
import { prisma } from "../../../index.js";
import cloudinary from "../../utilis/cloudinary.js";
import { methodsWillUsed } from "../../utilis/methodsWillUse.js";
import amqplib from "amqplib"
import { sendDataToQueue } from "../../utilis/rabbitMq.js";

//get all teachers
export const getAllTeacher = async (req, res, next) => {
    const getAllTeachers = await prisma.teacher.findMany({ include: { user: true } })
    return res.status(201).json({ message: "success", data: getAllTeachers })
};

// get all exams belongs to one teacher
export const getTeacherExams = async (req, res, next) => {
    const { id } = req.params
    if (!await prisma.teacher.findUnique({ where: { id } })) {
        return next(new ResError("teacher not exist", 400))
    }
    const getAllTeacherExams = await prisma.teacher.findUnique({ where: { id }, include: { Exam: { include: { questions: { include: { options: true } } } } } })
    console.log(getAllTeacherExams);
    return res.status(201).json({ message: "success", data: getAllTeacherExams })
};

// export const getAllStudentsSubmitInTeacherExam = async (req, res, next) => {
//     const { id } = req.params
//     const getAllTeacherExams = await prisma.teacher.findUnique({ where: { id }, include: { Exam: { include: { questions: { include: { options: true } } } } } })
//     console.log(getAllTeacherExams);
//     return res.status(201).json({ message: "success", data: getAllTeacherExams })
// };









