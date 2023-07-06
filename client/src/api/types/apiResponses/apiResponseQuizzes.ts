

  export interface Question {
    question: string
    options: Option[]
    _id: string
  }
  
  export interface Option {
    option: string
    isCorrect: boolean
    _id: string
  }
  