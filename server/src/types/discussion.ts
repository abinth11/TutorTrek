export interface Reply  {
   studentId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
 export interface AddDiscussionInterface  {
    studentId: string;
    message: string;
    lessonId: string;
    replies?: Reply[];
    createdAt: Date;
    updatedAt: Date;
  }