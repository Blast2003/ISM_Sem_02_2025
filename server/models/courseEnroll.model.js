import mongoose from "mongoose";
const courseEnrollSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['enrolled', 'unenrolled'],
        default:'unenrolled'
    }

},{timestamps:true});
export const CourseEnroll = mongoose.model('CourseEnroll', courseEnrollSchema);