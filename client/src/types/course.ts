export interface CourseInterface {
    _id: string;
    title: string;
    instructorId: string;
    duration: number;
    category: string;
    level: string;
    tags: string[];
    price: number;
    about: string;
    description: string;
    syllabus: string[];
    requirements: string[];
    thumbnailUrl: string;
    guidelinesUrl:string;
    coursesEnrolled: any[];
    rating: number;
    isVerified: boolean;
    completionStatus: number;
    createdAt: string;
    isPaid: boolean;
    __v: number;
  }

