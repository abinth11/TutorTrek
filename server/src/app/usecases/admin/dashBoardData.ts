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

  let revenueData: Array<{
    month: string;
    revenue: number;
    coursesAdded: number;
    coursesEnrolled: number;
  }> = [];
  if (
    revenueForEachMonth.status === 'fulfilled' &&
    coursesAdded.status === 'fulfilled' &&
    coursesEnrolled.status === 'fulfilled'
  ) {
    const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    revenueData = allMonths.map((month) => {
      const matchedRevenueMonth = revenueForEachMonth.value.find(
        (data) => data.month === month
      );
      const matchedAddedMonth = coursesAdded.value.find(
        (data) => data.month === month
      );
      const matchedEnrolledMonth = coursesEnrolled.value.find(
        (data) => data.month === month
      );
      return {
        month: monthNames[month - 1],
        revenue: matchedRevenueMonth ? matchedRevenueMonth.totalRevenue : 0,
        coursesAdded: matchedAddedMonth ? matchedAddedMonth.count : 0,
        coursesEnrolled: matchedEnrolledMonth ? matchedEnrolledMonth.count : 0
      };
    });
  }

  return {
    revenue: revenueData,
    trendingCourses: trending,
    courseByCategory:
      courseByCategory.status === 'fulfilled' ? courseByCategory.value : null
  };
};
