import END_POINTS from "../../../constants/endpoints";
import {
  addDiscussionService,
  editDiscussionService,
  getDiscussionsByLessonService,
  deleteDiscussionService,
  replyDiscussionService,
  getRepliesByDiscussionService
} from "../../services/course/discussion-service";

export const addDiscussion = (lessonId: string, message: string) => {
  return addDiscussionService(END_POINTS.ADD_DISCUSSION, lessonId, message);
};

export const getDiscussionsByLesson = (lessonId: string) => {
  return getDiscussionsByLessonService(
    END_POINTS.GET_DISCUSSIONS_BY_LESSON,
    lessonId
  );
};

export const editDiscussions = (id: string, message: string) => {
  return editDiscussionService(END_POINTS.EDIT_DISCUSSION, id, message);
};

export const deleteDiscussions = (id: string) => {
  return deleteDiscussionService(END_POINTS.DELETE_DISCUSSION, id);
};

export const replyDiscussions = (id: string,reply:{studentId:string,message:string}) => {
  return replyDiscussionService(END_POINTS.REPLY_TO_DISCUSSION, id,reply);
};

export const getRepliesByDiscussion = (id:string)=>{
  return getRepliesByDiscussionService(END_POINTS.GET_REPLIES_BY_DISCUSSION,id)
}