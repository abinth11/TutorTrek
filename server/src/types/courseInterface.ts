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
    introduction:FileSchema;
    guidelines:FileSchema;
    instructorId: string;
    rating: number;
    isVerified: boolean;
  }

  export interface CourseInterface extends AddCourseInfoInterface {
    coursesEnrolled:Array<string>,
    thumbnailUrl:string,
    introductionUrl:string,
    guidelinesUrl:string;

  }

  
  export interface AddQuizInfoInterface {
    courseId:string;
    lessonId:string;
    questions: Question[];
  }

  export interface EditQuizInfoInterface {
    courseId?:string;
    lessonId?:string;
    questions: Question[];
  }
  

  export interface EditCourseInfo {
    title?: string;
    thumbnail?: FileSchema;
    guidelines?:FileSchema;
    introductionVideo?: string;
    description?: string;
    category?: string;
    instructorId?: string;
    price?: number;
    enrollmentCount?: number;
    rating?: number;
    isVerified?: boolean;
    isPaid?: boolean;
    duration?: number;
    syllabus:string[]|string;
    requirements?: string[]|string;
    quiz?:AddQuizInfoInterface;
    tags?: string[]|string;
    enrollmentLimit?: number;
    completionStatus?: number;
  }