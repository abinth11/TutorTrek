import { QuizInterface } from '@src/types/quiz';
export function shuffleQuiz(quiz: QuizInterface | null): QuizInterface | null {
  if (!quiz) return null;
  const shuffledQuestions = shuffleArray(quiz.questions);

  // Shuffles an array using the Fisher-Yates shuffle algorithm
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the options for each question
  shuffledQuestions.forEach((question) => {
    question.options = shuffleArray(question.options);
  });

  const shuffledQuiz: QuizInterface = { ...quiz, questions: shuffledQuestions };
  return shuffledQuiz;
}
