import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { StudentsDbInterface } from '@src/app/repositories/studentDbRepository';

export const getAllStudentsU = async (
  studentRepository: ReturnType<StudentsDbInterface>
) => {
  const students = await studentRepository.getAllStudents();
  return students;
};

export const blockStudentU = async (
  studentId: string,
  reason: string,
  studentRepository: ReturnType<StudentsDbInterface>
) => {
  if (!studentId) {
    throw new AppError('Invalid student details', HttpStatusCodes.BAD_REQUEST);
  }
  if (!reason) {
    throw new AppError(
      'Please give a reason to block a student',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  const student = await studentRepository.getStudent(studentId);
  if (student?.isBlocked) {
    throw new AppError(
      'Already blocked this student',
      HttpStatusCodes.CONFLICT
    );
  }
  await studentRepository.blockStudent(studentId, reason);
};

export const unblockStudentU = async (
  studentId: string,
  studentRepository: ReturnType<StudentsDbInterface>
) => {
  if (!studentId) {
    throw new AppError('Invalid student details', HttpStatusCodes.BAD_REQUEST);
  }
  await studentRepository.unblockStudent(studentId);
};


export const getAllBlockedStudentsU = async (
  studentRepository: ReturnType<StudentsDbInterface>
) => {
  const blockedStudents = await studentRepository.getAllBlockedStudents();
  return blockedStudents;
};
