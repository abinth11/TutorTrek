import END_POINTS from "../../../constants/endpoints";
import {
  getInstructors,
  acceptRequest,
  rejectRequest,
  getAllInstructor,
  blockInstructor,
  unblockInstructor,
} from "../../services/admin/instructorManageService";

export const getAllInstructorRequests = () => {
  return getInstructors(END_POINTS.GET_INSTRUCTOR_REQUESTS);
};

export const acceptInstructorRequest = (instructorId: string) => {
  return acceptRequest(END_POINTS.ACCEPT_INSTRUCTOR_REQUESTS, instructorId);
};

export const rejectInstructorRequest = (
  instructorId: string,
  reason: string
) => {
  return rejectRequest(
    END_POINTS.REJECT_INSTRUCTOR_REQUESTS,
    instructorId,
    reason
  );
};

export const getAllInstructors = () => {
  return getAllInstructor(END_POINTS.GET_INSTRUCTORS);
};

export const blockInstructors = (instructorId: string, reason: string) => {
  return blockInstructor(
    END_POINTS.BLOCK_INSTRUCTORS,
    instructorId,
    reason
  );
};

export const unblockInstructors = (instructorId: string) => {
  return unblockInstructor(END_POINTS.UNBLOCK_INSTRUCTORS, instructorId);
};
