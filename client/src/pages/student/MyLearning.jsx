import React from "react";
import Course from "./Course";
import { useGetEnrolledCoursesQuery } from "@/features/api/enrollApi";

const MyLearning = () => {
  const { data, isLoading, isError } = useGetEnrolledCoursesQuery();

  const enrolledCourses = data?.enrolledCourses || [];

  console.log("enrolledCourses: ", enrolledCourses)

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : isError ? (
          <p>Failed to load enrolled courses.</p>
        ) : enrolledCourses.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {enrolledCourses.map((course, index) => (
              <Course key={course._id || index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
