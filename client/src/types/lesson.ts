export interface FormValuesLesson {
  [key: string]: any;
   title: string;
    description: string;
    about:string;
    studyMaterials:string;
    contents: string;
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
  