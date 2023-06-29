export interface InstructorApiResponse {
    certificates: string[]
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
    rejectedReason: string
}