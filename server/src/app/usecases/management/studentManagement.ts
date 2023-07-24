import { StudentInterface } from '@src/types/studentInterface';
import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { StudentsDbInterface } from '@src/app/repositories/studentDbRepository';
import { CloudServiceInterface } from '@src/app/services/cloudServiceInterface';

export const getAllStudentsU = async (
  cloudService:ReturnType<CloudServiceInterface>,
  studentRepository: ReturnType<StudentsDbInterface>
) => {
  const students:StudentInterface[]|null = await studentRepository.getAllStudents();
  await Promise.all(
    students.map(async (student) => {
      if (student?.profilePic?.key) {
        student.profileUrl = ""
        student.profileUrl = await cloudService.getFile(student.profilePic.key);
      }
    })
  );
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
  cloudService:ReturnType<CloudServiceInterface>,
  studentRepository: ReturnType<StudentsDbInterface>
) => {
  const blockedStudents:StudentInterface[]|null = await studentRepository.getAllBlockedStudents();
  await Promise.all(
    blockedStudents.map(async (student) => {
      if (student?.profilePic?.key) {
        student.profileUrl = ""
        student.profileUrl = await cloudService.getFile(student.profilePic.key);
      }
    })
  );
  return blockedStudents;
};
