import mongoose from "mongoose";
import { Course } from "./models/course.model.js";
import { Lecture } from "./models/lecture.model.js";

async function addHardwareCourse() {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@books-store-mern.xxruv7w.mongodb.net/IT_KMS?retryWrites=true&w=majority&appName=Books-Store-MERN"
    );

    //–– Course ––//
    const courseDoc = {
      _id: new mongoose.Types.ObjectId("64b3f2e3d4c5b6a7f8e9d0e1"),
      courseTitle: "Fundamentals of Computer Hardware",
      subTitle: "Learn the essentials of computer hardware components and assembly",
      description:
        "This course provides an in-depth exploration of computer hardware, including processors, memory, storage devices, and peripheral integration. You'll gain hands-on knowledge of assembling systems, troubleshooting hardware issues, and optimizing performance.",
      category: "Hardware",
      courseLevel: "Intermediate",
      coursePrice: 35,
      courseThumbnail: "https://you.blr1.cdn.digitaloceanspaces.com/2021/10/Computer-Hardware.jpg",
      enrolledStudents: [],
      lectures: [],
      creator: new mongoose.Types.ObjectId("681df86fe10a7ac034972a0a"),
      isPublished: true,
      createdAt: new Date("2025-05-10T12:00:00Z"),
      updatedAt: new Date("2025-05-10T12:00:00Z"),
    };

    // Insert the course (upsert to avoid duplicates)
    await Course.updateOne(
      { _id: courseDoc._id },
      { $set: courseDoc },
      { upsert: true }
    );

    //–– Lectures ––//
    const lectures = [
      {
        _id: new mongoose.Types.ObjectId("64b3f2e3d4c5b6a7f8e9d0e2"),
        lectureTitle: "Fundamentals of Computer Hardware – Lecture 1",
        videoUrl: "https://www.youtube.com/watch?v=OdziYWEkDIM",
        publicId: "lec_d0e1_1",
        isPreviewFree: true,
        createdAt: new Date("2025-05-10T12:00:00Z"),
        updatedAt: new Date("2025-05-10T12:00:00Z"),
        courseRef: courseDoc._id,
      },
      {
        _id: new mongoose.Types.ObjectId("64b3f2e3d4c5b6a7f8e9d0e3"),
        lectureTitle: "Fundamentals of Computer Hardware – Lecture 2",
        videoUrl: "https://www.youtube.com/watch?v=xj9mFD71Vfc",
        publicId: "lec_d0e1_2",
        isPreviewFree: false,
        createdAt: new Date("2025-05-10T12:00:00Z"),
        updatedAt: new Date("2025-05-10T12:00:00Z"),
        courseRef: courseDoc._id,
      },
      {
        _id: new mongoose.Types.ObjectId("64b3f2e3d4c5b6a7f8e9d0e4"),
        lectureTitle: "Fundamentals of Computer Hardware – Lecture 3",
        videoUrl: "https://www.youtube.com/watch?v=veugT7A9psY",
        publicId: "lec_d0e1_3",
        isPreviewFree: false,
        createdAt: new Date("2025-05-10T12:00:00Z"),
        updatedAt: new Date("2025-05-10T12:00:00Z"),
        courseRef: courseDoc._id,
      },
    ];

    // Insert lectures (upsert to avoid duplicates)
    for (const lecture of lectures) {
      await Lecture.updateOne(
        { _id: lecture._id },
        { $set: lecture },
        { upsert: true }
      );
    }

    //–– Update course with lecture IDs ––//
    const lectureIds = lectures.map((lec) => lec._id);
    await Course.updateOne(
      { _id: courseDoc._id },
      { $set: { lectures: lectureIds } }
    );

    console.log("🌱 Hardware course and lectures added successfully!");
  } catch (err) {
    console.error("Error adding hardware course:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

addHardwareCourse();