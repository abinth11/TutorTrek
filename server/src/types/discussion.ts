export interface Reply  {
    userId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
 export interface AddDiscussionInterface  {
    userId: string;
    message: string;
    lessonId: string;
    replies?: Reply[];
    createdAt: Date;
    updatedAt: Date;
  }