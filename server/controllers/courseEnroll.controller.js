import { Course } from "../models/course.model.js";
import { CourseEnroll } from "../models/courseEnroll.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

// API để người dùng ghi danh (enroll) một khoá học
export const createEnroll = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Kiểm tra đã ghi danh chưa
    const alreadyEnrolled = await CourseEnroll.findOne({ userId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled!" });
    }

    // Tạo bản ghi enroll mới
    const newEnroll = new CourseEnroll({
      courseId,
      userId,
      status: "enrolled", // gán trực tiếp là đã ghi danh
    });
    await newEnroll.save();

    // Cập nhật các lecture để mở khóa (ví dụ: set isPreviewFree = true)
    if (course.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: course.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    // Thêm vào danh sách khóa học của user
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    );

    // Thêm user vào danh sách học viên của khóa học
    await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Enrolled successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// API lấy chi tiết khóa học và trạng thái ghi danh
export const getCourseDetailWithEnrollStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const enrolled = await CourseEnroll.findOne({ userId, courseId });

    return res.status(200).json({
      course,
      enrolled: !!enrolled,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// API lấy toàn bộ khóa học đã ghi danh
export const getAllEnrolledCourse = async (req, res) => {
  try {
    const userId = req.id; 

    const enrolledCourses = await CourseEnroll.find({
      userId,
      status: "enrolled",
    }).populate({
      path: "courseId",
      select: "courseTitle subTitle description courseThumbnail coursePrice category courseLevel creator enrolledStudents lectures isPublished createdAt",
    });

    // Extract the course data from populated courseId
    const courses = enrolledCourses.map((enroll) => enroll.courseId);

    return res.status(200).json({ enrolledCourses: courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
