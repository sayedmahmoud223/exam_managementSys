import { ResError } from "../../utilis/ErrorHandling.js";
import { prisma } from "../../../index.js";
import cloudinary from "../../utilis/cloudinary.js";
import { methodsWillUsed } from "../../utilis/methodsWillUse.js";
import amqplib from "amqplib"
import { sendDataToQueue } from "../../utilis/rabbitMq.js";


export const studentSubmitExam = async (req, res, next) => {
    const { examId, answers } = req.body;
    const { id } = req.user;
    console.log({ examId, id, answers });
    const exam = await prisma.exam.findUnique({ where: { id: examId }, include: { questions: { include: { options: true } } } })
    if (!exam) return next(new ResError("exam not exist", 400));
    const studentSubmitExam = await prisma.studentExam.findUnique({ where: { studentId_examId: { examId, studentId: id } } })
    if (studentSubmitExam) return next(new ResError("you can submit this exam for one time", 400));
    let correctAnswers = {}
    for (const questions of exam.questions) {
        const correctOption = questions.options.find((opt) => opt.isCorrect)
        if (correctOption) {
            correctAnswers[questions.id] = correctOption.id
        }
    }
    let questionGrade = exam.grade / exam.questions.length
    let score = 0;
    const resultDetails = []
    for (const answer of answers) {
        const answerIsCorrect = correctAnswers[answer.questionId] === answer.optionId
        if (answerIsCorrect) score += questionGrade
        resultDetails.push({
            questionId: answer.questionId,
            selectedOption: answer.optionId,
            answerIsCorrect
        })
    }
    res.json({
        message: "Evaluation completed",
        score,
        totalQuestions: exam.questions.length,
        details: resultDetails
    });
    // return res.status(201).json({ message: "success", data: exam })
};

// export const getAllStudentsSubmitInTeacherExam = async (req, res, next) => {
//     const { id } = req.params
//     const getAllTeacherExams = await prisma.teacher.findUnique({ where: { id }, include: { Exam: { include: { questions: { include: { options:true } } } } } })
//     console.log(getAllTeacherExams);
//     return res.status(201).json({ message: "success", data: getAllTeacherExams })
// };









