import END_POINTS from "../../../constants/endpoints";
import { addCourseService } from "../../services/instructor/courseService";
import { getCoursesByInstructorService } from "../../services/instructor/courseService";

export const addCourse = (courseInfo:any)=>{
    return addCourseService(END_POINTS.ADD_COURSE,courseInfo)
}

export const getCourseByInstructor = ()=>{
    return getCoursesByInstructorService(END_POINTS.GET_COURSES_BY_INSTRUCTORS)
}

