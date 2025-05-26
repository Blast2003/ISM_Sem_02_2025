import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import loader from "../../assets/loader.svg";
import { useGetCoursesCountQuery, useGetPublishedCourseQuery } from "@/features/api/courseApi";


const CustomizedAxisTick = ({ x, y, payload }) => {
const words = payload.value.split(" ");
return (
 <text
   x={x}
   y={y + 10}
   textAnchor="end"
   fill="#fff" 
   transform={`rotate(-35, ${x}, ${y + 10})`}
   fontSize={12}
 >
   {words.map((word, i) => (
     <tspan x={x} dy={i === 0 ? 0 : 14} key={i}>
       {word}
     </tspan>
   ))}
 </text>
);
};


const Dashboard = () => {

  const {data: enrolledCourse, isSuccess, isError, isLoading} = useGetPublishedCourseQuery();

  const {
    data: countData,
    isLoading: isLoadingCount,
    isError: isErrorCount
  } = useGetCoursesCountQuery();

  if (isLoading && isLoadingCount) {
    return (
              <div className="flex flex-col items-center justify-center h-96">
                <img width="100" src={loader} alt="loader" />
                <p>Loading...</p>
              </div>
            );
  }

  if(isError || isErrorCount) return <h1 className="text-red-500">Failed to get course virtualization</h1>


  console.log("aaaaaaaaaaaaaa", enrolledCourse)

  const totalSales = countData?.count ?? 0;


  const courseData = enrolledCourse?.courses?.map((course, index)=> ({
    name: `Course ${index + 1}`, 
    view:course?.coursePrice
  }))

  const totalRevenue = enrolledCourse?.courses.reduce((acc,element) => acc+(element.coursePrice || 0), 0);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total View</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
        </CardContent>
      </Card>

      {/* Course Prices Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                height={60}
                interval={0}
                tick={<CustomizedAxisTick />}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`${value}👁`, name]} />
              <Line
                type="monotone"
                dataKey="view"
                stroke="#4a90e2" // Changed color to a different shade of blue
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
