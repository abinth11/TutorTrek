const END_POINTS = {
    LOGIN_STUDENT:'api/auth/student-login',
    REGISTER_STUDENT:'api/auth/student-register',
    GOOGLE_LOGIN_STUDENT:'api/auth/login-with-google',
    REGISTER_INSTRUCTOR:'api/auth/instructor/instructor-register',
    LOGIN_INSTRUCTOR:'api/auth/instructor/instructor-login',
    LOGIN_ADMIN:'api/auth/admin/admin-login',
    GET_INSTRUCTOR_REQUESTS:'api/admin/instructors/view-instructor-requests',
    ACCEPT_INSTRUCTOR_REQUESTS:'api/admin/instructors/accept-instructor-request',
    REJECT_INSTRUCTOR_REQUESTS:'api/admin/instructors/reject-instructor-request',
    GET_INSTRUCTORS:'api/admin/instructors/get-all-instructors',
    BLOCK_INSTRUCTORS:'api/admin/instructors/get-all-instructors/block-instructors',
    UNBLOCK_INSTRUCTORS:'api/admin/instructors/get-all-instructors/unblock-instructors',
    GET_BLOCKED_INSTRUCTORS:'api/admin/instructors/get-blocked-instructors',
    ADD_COURSE:'api/courses/instructors/add-course'
}
export default END_POINTS