import END_POINTS from "../../../constants/endpoints";
import {
  getInstructors,
  acceptRequest,
  rejectRequest,
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
