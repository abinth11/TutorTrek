import { QuizRepositoryMongoDbInterface } from "@src/frameworks/database/mongodb/repositories/quizzDbRepository";

export const quizDbRepository = (repository:ReturnType<QuizRepositoryMongoDbInterface>) =>{
    const getQuizByLessonId = async (lessonId:string)=>await repository.getQuizByLessonId(lessonId)
    return {
        getQuizByLessonId
    }

}

export type QuizDbInterface = typeof quizDbRepository