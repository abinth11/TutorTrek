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
  if (!lesson) {
    throw new AppError('Data is not provided', HttpStatusCodes.BAD_REQUEST);
  }
  let isStudyMaterialUpdated = false,
    isLessonVideoUpdated = false;
  const oldLesson = await lessonDbRepository.getLessonById(lessonId);
  if (media?.length) {
    const videoFile = media[0];
    const tempFilePath = './temp_video.mp4';
    fs.writeFileSync(tempFilePath, videoFile.buffer);
    const getVideoDuration = () =>
      new Promise<string>((resolve, reject) => {
        ffmpeg(tempFilePath)
          .setFfprobePath(ffprobePath.path)
          .ffprobe((err: Error | null, data: any) => {
            fs.unlinkSync(tempFilePath);
            if (err) {
              console.error('Error while probing the video:', err);
              reject(err);
            }
            const duration: string = data.format.duration;
            resolve(duration);
          });
      });

    try {
      const videoDuration = await getVideoDuration();
      lesson.duration = parseFloat(videoDuration);
    } catch (error) {
      console.error('Error while getting video duration:', error);
    }
  }
  lesson.media=[]
  if (media && media.length > 0) {
    const uploadPromises = media.map(async (file) => {
      if (file.mimetype === 'application/pdf') {
        const studyMaterial = await cloudService.upload(file);
        lesson.media.push(studyMaterial);
        isStudyMaterialUpdated = true;
      } else {
        const lessonVideo = await cloudService.upload(file);
        lesson.media.push(lessonVideo);
        isLessonVideoUpdated = true;
      }
    });

    await Promise.all(uploadPromises);
  }
  const response = await lessonDbRepository.editLesson(lessonId, lesson);
  if (!response) {
    throw new AppError('Failed to edit lesson', HttpStatusCodes.BAD_REQUEST);
  }
  await quizDbRepository.editQuiz(lessonId, { questions: lesson.questions });
  if (response) {
    if (isLessonVideoUpdated && oldLesson?.media) {
      const videoObject = response.media.find(
        (item) => item.name === 'lessonVideo'
      );
      await cloudService.removeFile(videoObject?.key ?? '');
    }
    if (isStudyMaterialUpdated && oldLesson?.media) {
      const materialObject = response.media.find(
        (item) => item.name === 'materialFile'
      );
      await cloudService.removeFile(materialObject?.key ?? '');
    }
  }
};
