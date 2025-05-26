import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createEnroll,
  getAllEnrolledCourse,
  getCourseDetailWithEnrollStatus
} from "../controllers/courseEnroll.controller.js";

const router = express.Router();

// Ghi danh vào khoá học
router.route("/enroll").post(isAuthenticated, createEnroll);

// Lấy chi tiết khoá học + trạng thái đã ghi danh
router.route("/course/:courseId/detail-with-status").get(
  isAuthenticated,
  getCourseDetailWithEnrollStatus
);

// Lấy toàn bộ các khoá học đã ghi danh
router.route("/").get(isAuthenticated, getAllEnrolledCourse);

export default router;
