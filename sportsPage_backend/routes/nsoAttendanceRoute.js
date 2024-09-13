import { getAttendance, postAttendance, sendStudents } from "../controllers/nsoAttendanceController.js";
import User from "../models/userModel.js";
import express from "express";
import { isLoggedIn,findIfCoordinator } from "../mw.js";

const attendanceRouter = express.Router();

attendanceRouter.route('/')
    .get(getAttendance)
attendanceRouter.route('/students')
    .get(sendStudents);
attendanceRouter.route('/:id')
    // .post(isLoggedIn, findIfCoordinator , postAttendance)
    .post(postAttendance)

export default attendanceRouter;

