interface Replies {
  createdAt: string;
  lessonId: string;
  message: string;
  updatedAt: string;
  userId: string;
  _id: string;
}

export interface ApiResponseDiscussion {
  createdAt: string;
  lessonId: string;
  message: string;
  replies: Replies[]; 
  updatedAt: string;
  userId: string;
  _id: string;
}