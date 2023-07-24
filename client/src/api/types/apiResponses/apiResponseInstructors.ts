export interface InstructorApiResponse {
    profilePic:string;
    certificates: Certificate[]
    isBlocked: boolean
    blockedReason: string
    _id: string
    firstName: string
    lastName: string
    email: string
    mobile: string
    qualification: string
    subjects: string[]
    experience: string
    skills: string
    about: string
    password: string
    isVerified: boolean
    coursesCreated: any[]
    dateJoined: string
    __v: number
    rejected: boolean
    rejectedReason: string,
    profileUrl:string;
}

interface Certificate {
    name:string;
    url:string;
}

export interface GetCourseByInstructorInterface {
    _id: string
    title: string
    thumbnail?: string
    introductionVideo?: string
    thumbnailUrl:string;
    description: string
    category: string
    instructorId: string
    isPaid: boolean
    price?: number
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
  }


  export interface ApiResponseLessons{
    _id: string
    title: string
    description: string
    contents: string[]
    thumbnail:string
    videoUrl: string
    duration: number
    instructorId: string
    courseId: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  