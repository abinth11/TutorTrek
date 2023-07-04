export interface FormValuesLesson {
  [key: string]: any;
   title: string;
    description: string;
    contents: string;
    videoFile: string;
    duration: string;
    questions: Question[];
  }
  
  interface Question {
    question: string;
    options: Option[];
  }
  
  interface Option {
    option: string;
    isCorrect: boolean;
  }
  