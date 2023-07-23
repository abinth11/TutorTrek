export interface CourseInterface {
    category:string;
    coursesEnrolled:Array<string>;
    completionStatus:number;
    createdAt:Date;
    description:string;
    duration:number|string;
    enrollmentCount:0;
    instructorId:string;
    introductionVideo:string|null;
    isPaid:boolean;
    isVerified:boolean;
    lessons:Array<string>;
    price:number;
    rating:number;
    requirements:Array<string>
    tags:Array<string>;
    thumbnail:string;
    title:string;
    _id:string;
}

