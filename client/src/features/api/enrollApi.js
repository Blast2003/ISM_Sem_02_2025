import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_ENROLL_API = "http://localhost:3000/api/v1/courseEnroll";

export const enrollApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_ENROLL_API,
    credentials: "include",
  }),
  tagTypes: ["EnrolledCourses"], // Define tag for enrolled courses
  endpoints: (builder) => ({
    // Ghi danh vào khoá học
    createEnroll: builder.mutation({
      query: (courseId) => ({
        url: "/enroll",
        method: "POST",
        body: { courseId },
      }),
      invalidatesTags: ["EnrolledCourses"], // Invalidate EnrolledCourses tag on success
    }),
    // Lấy chi tiết khoá học + trạng thái ghi danh
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    // Lấy toàn bộ khoá học đã ghi danh
    getEnrolledCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
      providesTags: ["EnrolledCourses"], // Provide EnrolledCourses tag for cache
    }),
  }),
});

export const {
  useCreateEnrollMutation,
  useGetCourseDetailWithStatusQuery,
  useGetEnrolledCoursesQuery,
} = enrollApi;