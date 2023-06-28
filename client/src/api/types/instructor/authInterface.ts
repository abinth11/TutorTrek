export interface InstructorRegisterDataInterface {
    [key: string]: any;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    qualification: string;
    subjects: string;
    experience: string;
    skills: string;
    about: string;
    password: string;
    images?: File[]; 

  }

export interface InstructorLoginInfo {
  email:string;
  password:string;
}