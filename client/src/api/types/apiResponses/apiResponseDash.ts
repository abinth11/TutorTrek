export interface DashData {
    numberOfCourses: number
    numberInstructors: number
    numberOfStudents: number
    monthlyRevenue: number
  }
  

  
  export interface GraphData {
    revenue: Revenue[]
    trendingCourses: TrendingCourse[]
    courseByCategory: CourseByCategory[]
  }
  
  export interface Revenue {
    month: string
    revenue: number
    coursesAdded: number
    coursesEnrolled: number
  }
  
  export interface TrendingCourse {
    title: string
    enrolled: number
  }
  
  export interface CourseByCategory {
    _id: string
    name: string
    courseCount: number
  }
  