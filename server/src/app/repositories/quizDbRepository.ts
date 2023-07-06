import { QuizRepositoryMongoDbInterface } from "@src/frameworks/database/mongodb/repositories/quizzDbRepository";
import { AddQuizInfoInterface } from '@src/types/courseInterface';

export const quizDbRepository = (repository:ReturnType<QuizRepositoryMongoDbInterface>) =>{

    const addQuiz = async (quiz:AddQuizInfoInterface)=>await repository.addQuiz(quiz)

    const getQuizByLessonId = async (lessonId:string)=>await repository.getQuizByLessonId(lessonId)

    return {
        addQuiz,
        getQuizByLessonId
    }

}

export type QuizDbInterface = typeof quizDbRepository