import { Question } from "./lesson";
export interface AddCourseInfoInterface {
    title: string;
    thumbnail: string;
    introductionVideo?: string;
    description: string;
    category: string;
    instructorId: string;
    price: number;
    enrollmentCount: number;
    rating: number;
    lessons: string[];
    isVerified: boolean;
    isPaid: boolean;
    duration?: number;
    requirements?: string[];
    quiz:AddQuizInfoInterface;
    tags?: string[];
    enrollmentLimit?: number;
    completionStatus?: number;
  }
  
  export interface AddQuizInfoInterface {
    courseId:string;
    lessonId:string;
    questions: Question[];
  }
  

  export interface EditCourseInfo {
    title?: string;
    thumbnail?: string;
    introductionVideo?: string;
    description?: string;
    category?: string;
    instructorId?: string;
    price?: number;
    enrollmentCount?: number;
    rating?: number;
    lessons?: string[];
    isVerified?: boolean;
    isPaid?: boolean;
    duration?: number;
    requirements?: string[];
    quiz?:AddQuizInfoInterface;
    tags?: string[];
    enrollmentLimit?: number;
    completionStatus?: number;
  }