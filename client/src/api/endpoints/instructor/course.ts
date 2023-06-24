import END_POINTS from "../../../constants/endpoints";
import { addCourseService } from "../../services/instructor/courseService";

export const addCourse = (courseInfo:any)=>{
    return addCourseService(END_POINTS.ADD_COURSE,courseInfo)
}