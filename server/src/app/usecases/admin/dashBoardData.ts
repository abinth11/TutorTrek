import { CourseDbRepositoryInterface } from '../../../app/repositories/courseDbRepository';
import { InstructorDbInterface } from '../../../app/repositories/instructorDbRepository';
import { StudentsDbInterface } from '../../../app/repositories/studentDbRepository';
import { PaymentInterface } from '../../../app/repositories/paymentDbRepository';

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
