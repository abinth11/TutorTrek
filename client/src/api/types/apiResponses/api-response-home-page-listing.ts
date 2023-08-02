export interface ApiResponseRecommended {
  _id: string
  instructor: Instructor
  course: Course,
  media:{
    profileUrl:string,
    thumbnailUrl:string,
  }
}

export interface Instructor {
  _id: string
  firstName: string
  lastName: string
  email: string
}

export interface Course {
  _id: string
  name: string
  thumbnail: string
}

  
  export interface Courses {
    _id: string
    title: string
    thumbnail: string
    introductionVideo: string
    description: string
    category: string
    instructorId: string
    isPaid: boolean
    price: number
    enrollmentCount: number
    rating: number
    lessons: string[]
    isVerified: boolean
    duration: number
    requirements: string[]
    tags: string[]
    completionStatus: number
    createdAt: string
    reviews: any[]
    __v: number
    coursesEnrolled: string[]
    categoryId: string
  }
  
  export interface ApiResponseTrending {
    _id: string
    title: string
    thumbnailUrl: string;
    profileUrl:string;
    instructorFirstName: string
    instructorLastName: string
  }