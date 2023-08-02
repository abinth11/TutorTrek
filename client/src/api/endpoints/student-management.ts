import {
  getAllStudentsService,
  blockStudentService,
  unblockStudentService,
  getAllBlockedStudentsService,
} from "../services/student-manage-service";
import END_POINTS from "../../constants/endpoints";

export const getAllStudents = () => {
  return getAllStudentsService(END_POINTS.GET_ALL_STUDENTS);
};

export const blockStudents = (studentId:string,reason: string) => {
  return blockStudentService(END_POINTS.BLOCK_STUDENT,studentId, reason);
};

export const unblockStudent = (studentId:string) => {
  return unblockStudentService(END_POINTS.UNBLOCK_STUDENT,studentId);
};

export const getAllBlockedStudents = ()=>{
    return getAllBlockedStudentsService(END_POINTS.GET_BLOCKED_STUDENTS)
}
