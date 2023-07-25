import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import AppError from '../../../utils/appError';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import { CourseInterface } from '../../../types/courseInterface';

export const searchCourseU = async (
  searchQuery: string,
  filterQuery: string,
  courseDbRepository: ReturnType<CourseDbRepositoryInterface>
) => {
  if (!searchQuery && !filterQuery) {
    throw new AppError(
      'Please provide a search or filter query',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  let isFree = false,filter=false
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
    filter=true
  }

  const searchResult: CourseInterface[] = await courseDbRepository.searchCourse(
    isFree,
    filter,
    searchParams,
    filterQuery
  );
  return searchResult;
};
