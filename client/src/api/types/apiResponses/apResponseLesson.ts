export interface ApiResponseLesson {
    _id: string
    title: string
    description: string
    contents: string[]
    duration: number
    instructorId: string
    courseId: string
    media: Media[]
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Media{
    key: string
    name: string
    _id: string
  }