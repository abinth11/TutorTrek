export interface InstructorInterface {
    firstName:string;
    lastName:string;
    profilePic:string;
    email: string;
    mobile:number;
    qualifications:string;
    subjects:string;
    experience:string;
    skills:string;
    about:string;
    password: string;
    certificates:Certificate[]
}
export interface Certificate {
    name:string;
    url:string;
}
export interface SavedInstructorInterface extends InstructorInterface {
    _id:string;
    isVerified:boolean;
    dateJoined:Date;
    coursesCreated:Array<String>

}