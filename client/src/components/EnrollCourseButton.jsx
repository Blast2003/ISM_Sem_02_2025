import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCreateEnrollMutation, useGetCourseDetailWithStatusQuery } from "@/features/api/enrollApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EnrollCourseButton = ({ courseId }) => {
  const [isEnrolled, setIsEnrolled] = useState(false); // Track enrollment status
  const [createEnroll, { data, isLoading, isSuccess, isError, error }] = useCreateEnrollMutation();
  const navigate = useNavigate(); // For navigation to course progress

  // Fetch enrollment status with refetchOnMountOrArgChange
  const { data: courseData, isLoading: isStatusLoading, isFetching, refetch } = useGetCourseDetailWithStatusQuery(courseId, {
    refetchOnMountOrArgChange: true, // Refetch when component mounts or courseId changes
  });

  // Set initial enrollment status when courseData is available
  useEffect(() => {
    if (courseData?.enrolled) {
      setIsEnrolled(true);
    } else {
      setIsEnrolled(false); // Ensure state is reset if not enrolled
    }
  }, [courseData]);

  const enrollCourseHandler = async () => {
    await createEnroll(courseId);
  };

  const handleContinueCourse = () => {
    if (isEnrolled) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  // Handle API response for enrollment
  useEffect(() => {
    if (isSuccess && data) {
      if (data.success) {
        // Show toast and update enrollment status
        toast.success(data.message || "Enrolled successfully!");
        setIsEnrolled(true); // Mark as enrolled
        refetch(); // Force refetch to ensure courseData is updated
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to enroll in course");
    }
  }, [data, isSuccess, isError, error, refetch]);

  return (
    <Button
      disabled={isLoading || isStatusLoading || isFetching} // Disable during fetching
      onClick={isEnrolled ? handleContinueCourse : enrollCourseHandler}
      className="w-full"
    >
      {isLoading || isFetching ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : isEnrolled ? (
        "View Course"
      ) : (
        "Enroll in Course"
      )}
    </Button>
  );
};

export default EnrollCourseButton;
