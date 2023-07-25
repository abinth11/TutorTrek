import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { CreateLessonInterface } from '../../../types/lesson';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';
import { QuizDbInterface } from '@src/app/repositories/quizDbRepository';
import { LessonDbRepositoryInterface } from '@src/app/repositories/lessonDbRepository';
import * as ffprobePath from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';

export const editLessonsU = async (
  media: Express.Multer.File[] | undefined,
  lessonId: string,
  lesson: CreateLessonInterface,
  lessonDbRepository: ReturnType<LessonDbRepositoryInterface>,
  cloudService: ReturnType<CloudServiceInterface>,
  quizDbRepository: ReturnType<QuizDbInterface>
) => {
  console.log(media);
  console.log(lesson);

  if (!lesson) {
    throw new AppError('Data is not provided', HttpStatusCodes.BAD_REQUEST);
  }

  if (media) {
    const videoFile = media[0];
    // Save the buffer to a temporary file
    const tempFilePath = './temp_video.mp4';
    fs.writeFileSync(tempFilePath, videoFile.buffer);

    // Wrap the ffprobe call inside a Promise
    const getVideoDuration = () =>
      new Promise<string>((resolve, reject) => {
        ffmpeg(tempFilePath)
          .setFfprobePath(ffprobePath.path)
          .ffprobe((err: Error | null, data: any) => {
            // Clean up the temporary file after the ffprobe operation is done
            fs.unlinkSync(tempFilePath);

            if (err) {
              console.error('Error while probing the video:', err);
              reject(err);
            }

            // The duration will be in the format 'HH:mm:ss.SSS'
            const duration: string = data.format.duration;
            console.log('Video Duration:', duration);
            resolve(duration);
          });
      });

    try {
      // Call the getVideoDuration function and wait for the result
      const videoDuration = await getVideoDuration();
      lesson.duration = parseFloat(videoDuration);
      // You can now use the videoDuration variable as needed
      console.log('Video Duration:', videoDuration);
    } catch (error) {
      console.error('Error while getting video duration:', error);
    }
  }

  if (media) {
    lesson.media = await Promise.all(
      media.map(async (files) => await cloudService.upload(files))
    );
  }
  const response = await lessonDbRepository.editLesson(lessonId, lesson);
  if (!response) {
    throw new AppError('Failed to edit lesson', HttpStatusCodes.BAD_REQUEST);
  }
  await quizDbRepository.editQuiz(lessonId, { questions: lesson.questions });
};
