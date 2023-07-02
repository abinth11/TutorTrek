export interface CreateLessonInterface {
    title: string;
    description: string;
    contents: string[];
    videoUrl: string;
    duration: number;
    instructorId: string;
    courseId: string;
    media: {name:string,key:string} [],
    questions:Question[]
  }

  export interface Question {
    question: string;
    options: Option[];
  }
  
  interface Option {
    option: string;
    isCorrect: boolean;
  }