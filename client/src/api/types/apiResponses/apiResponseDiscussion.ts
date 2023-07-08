interface Replies {
  createdAt: string;
  lessonId: string;
  message: string;
  updatedAt: string;
  studentId: string;
  _id: string;
}

export interface ApiResponseDiscussion {
  createdAt: string;
  lessonId: string;
  message: string;
  replies: Replies[]; 
  updatedAt: string;
  studentDetails: StudentDetails;
  _id: string;
}

interface StudentDetails {
    _id:string;
    firstName: string;
    lastName: string;
    dateJoined: Date;
  }
  