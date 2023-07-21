import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import { InstructorDbInterface } from '../../../app/repositories/instructorDbRepository';
import { StudentsDbInterface } from '../../../app/repositories/studentDbRepository';
import { PaymentInterface } from '../../../app/repositories/paymentDbRepository';
import { CategoryDbInterface } from '@src/app/repositories/categoryDbRepository';

export const getDashBoardDetailsU = async (
  dbRepositoryCourse: ReturnType<CourseDbRepositoryInterface>,
  dbRepositoryInstructor: ReturnType<InstructorDbInterface>,
  dbRepositoryStudent: ReturnType<StudentsDbInterface>,
  dbRepositoryPayment: ReturnType<PaymentInterface>
) => {
  const [numberOfCourses, numberInstructors, numberOfStudents, monthlyRevenue] =
    await Promise.allSettled([
      dbRepositoryCourse.getTotalNumberOfCourses(),
      dbRepositoryInstructor.getTotalNumberOfInstructors(),
      dbRepositoryStudent.getTotalNumberOfStudents(),
      dbRepositoryPayment.getMonthlyRevenue()
    ]);

  return {
    numberOfCourses:
      numberOfCourses.status === 'fulfilled' ? numberOfCourses.value : null,
    numberInstructors:
      numberInstructors.status === 'fulfilled' ? numberInstructors.value : null,
    numberOfStudents:
      numberOfStudents.status === 'fulfilled' ? numberOfStudents.value : null,
    monthlyRevenue:
      monthlyRevenue.status === 'fulfilled' ? monthlyRevenue.value : null
  };
};

export const getGraphDetailsU = async (
  dbRepositoryCourse: ReturnType<CourseDbRepositoryInterface>,
  dbRepositoryCategory: ReturnType<CategoryDbInterface>,
  dbRepositoryPayment: ReturnType<PaymentInterface>
) => {
  const [
    trendingCourses,
    courseByCategory,
    revenueForEachMonth,
    coursesAdded,
    coursesEnrolled
  ] = await Promise.allSettled([
    dbRepositoryCourse.getTrendingCourse(),
    dbRepositoryCategory.getCourseCountByCategory(),
    dbRepositoryPayment.getRevenueForEachMonth(),
    dbRepositoryCourse.getNumberOfCoursesAddedInEachMonth(),
    dbRepositoryPayment.getCoursesEnrolledPerMonth()
  ]);

  let trending: Array<{ title: string; enrolled: number }> = [];
  if (trendingCourses.status === 'fulfilled') {
    trendingCourses.value.map((course) => {
      trending.push({
        title: course?.title,
        enrolled: course.coursesEnrolled?.length
      });
    });
  }

  let monthlyRevenue: Array<{ month: number; totalRevenue: number }> = [];
  if (revenueForEachMonth.status === 'fulfilled') {
    const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
    monthlyRevenue = allMonths.map((month) => {
      const matchedMonth = revenueForEachMonth.value.find(
        (data) => data.month === month
      );
      return {
        month,
        totalRevenue: matchedMonth ? matchedMonth.totalRevenue : 0
      };
    });
  }

  let coursesAddedMonthPerMonth: Array<{ month: number; count: number }> = [];
  if (coursesAdded.status === 'fulfilled') {
    const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
    coursesAddedMonthPerMonth = allMonths.map((month) => {
      const matchedMonth = coursesAdded.value.find(
        (data) => data.month === month
      );
      return {
        month,
        count: matchedMonth ? matchedMonth.count : 0
      };
    });
  }

  let coursesEnrolledPerMonth: Array<{ month: number; count: number }> = [];
  if (coursesEnrolled.status === 'fulfilled') {
    const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
    coursesEnrolledPerMonth = allMonths.map((month) => {
      const matchedMonth = coursesEnrolled.value.find(
        (data) => data.month === month
      );
      return {
        month,
        count: matchedMonth ? matchedMonth.count : 0
      };
    });
  }

  return {
    revenue: {
      monthlyRevenue,
      coursesAddedMonthPerMonth,
      coursesEnrolledPerMonth
    },
    trendingCourses: trending,
    courseByCategory:
      courseByCategory.status === 'fulfilled' ? courseByCategory.value : null
  };
};
