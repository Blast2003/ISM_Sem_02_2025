import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import courseEnrollRoute from "./routes/courseEnroll.route.js";

import path from "path"

dotenv.config({});

const __dirname = path.resolve();

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3031;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors());

 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/courseEnroll", courseEnrollRoute);


// http://localhost:3031 + http://localhost:5173 = http://localhost:3031 => backend server, frontend server
// server static assets if in production
if (process.env.NODE_ENV === "production") {
  
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  });
  

}

 
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})


