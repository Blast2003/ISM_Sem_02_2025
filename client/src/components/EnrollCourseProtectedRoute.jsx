import { useGetCourseDetailWithStatusQuery } from "@/features/api/enrollApi";

import { useParams, Navigate } from "react-router-dom";

import loader from "../assets/loader.svg";

const EnrollCourseProtectedRoute = ({children}) => {
    const {courseId} = useParams();
    const {data, isLoading} = useGetCourseDetailWithStatusQuery(courseId);

    if (isLoading) {
          return (
            <div className="flex flex-col items-center justify-center h-96">
              <img width="100" src={loader} alt="loader" />
              <p>Loading...</p>
            </div>
          );
        }

    return data?.enrolled ? children : <Navigate to={`/course-detail/${courseId}`} />;
}
export default EnrollCourseProtectedRoute;