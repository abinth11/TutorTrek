import END_POINTS from "../../../constants/endpoints";
import { addDiscussionService } from "../../services/course/discussionService";

export const addDiscussion = (lessonId:string,message:string)=>{
    return addDiscussionService(END_POINTS.ADD_DISCUSSION,lessonId,message)

}