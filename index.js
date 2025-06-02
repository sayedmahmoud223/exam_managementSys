import "./src/utilis/envConfig.js"
// import "./src/utilis/rabbitMq.js"
import "./src/workers/teacherWorker.js"
import express from "express";

import { initApp } from "./src/initApp.js";
import { PrismaClient } from './src/generated/prisma/index.js';

const app = express();
const port = process.env.PORT || 3000;

export const prisma = new PrismaClient();

initApp(app, express);

app.listen(port, () => {
    console.log("Server Connected on port", port);
});