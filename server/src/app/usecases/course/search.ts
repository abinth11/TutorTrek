import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import AppError from '../../../utils/appError';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { CourseInterface } from '../../../types/courseInterface';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';

export const searchCourseU = async (
  searchQuery: string,
  filterQuery: string,
  cloudService:ReturnType<CloudServiceInterface>,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!searchQuery && !filterQuery) {
    throw new AppError(
      'Please provide a search or filter query',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  let isFree = false
  let searchParams: string;

  if (searchQuery) {
    // Check if the search query has the "free" prefix
    const freeRegex = /^free\s/i;
    const isFreeMatch = searchQuery.match(freeRegex);
    if (isFreeMatch) {
      isFree = true;
      searchParams = searchQuery.replace(freeRegex, '').trim();
    } else {
      searchParams = searchQuery;
    }
  } else {
    searchParams = filterQuery;
  }

  const searchResult= await courseDbRepository.searchCourse(
    isFree,
    searchParams,
    filterQuery
  );
  await Promise.all(
    searchResult.map(async (course) => {
      if (course.thumbnail) {
        course.thumbnailUrl = await cloudService.getFile(course.thumbnail.key);
      }
    })
  );
  return searchResult;
};
