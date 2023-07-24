import { Question } from "./lesson";

interface FileSchema {
  key:string;
  name:string
  url?:string;
}
export interface AddCourseInfoInterface {
    title: string;
    duration: number;
    category: string;
    level:string;
    tags: string[]|string;
    price: number;
    isPaid: boolean;
    about:string;
    description: string;
    syllabus:string[]|string;
    requirements:string[]|string;
    thumbnail: FileSchema;
    guidelines:FileSchema;
    instructorId: string;
    rating: number;
    isVerified: boolean;
  }

  export interface CourseInterface extends AddCourseInfoInterface {
    coursesEnrolled:Array<string>,
    thumbnailUrl:string,
    guidelinesUrl:string;

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