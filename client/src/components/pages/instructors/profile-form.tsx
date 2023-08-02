import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { getInstructorDetails, updateProfile } from "../../../api/endpoints/instructor";
import { UpdateProfileInfo } from "../../../api/types/instructor/instructor";
import { Avatar } from "@material-tailwind/react";
import { InstructorApiResponse } from "../../../api/types/apiResponses/api-response-instructors";

interface Props {
  editMode: boolean;
  setEditMode: (val: boolean) => void;
}
const ProfileForm: React.FC<Props> = ({ editMode, setEditMode }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [instructor, setInstructor] = useState<InstructorApiResponse | null>(
    null
  );
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [updated, setUpdated] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("profilePic", file);
    } else {
      setPreviewImage(null);
      formik.setFieldValue("profilePic", null);
    }
  };
  const fetchInstructor = async () => {
    try {
      setProfileLoading(true);
      const response = await getInstructorDetails();
      setInstructor(response?.data);
      setProfileLoading(false);
    } catch (error) {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (instructor) {
      formik.setValues({
        email: instructor.email || "",
        firstName: instructor.firstName || "",
        lastName: instructor.lastName || "",
        mobile: instructor.mobile || "",
        qualification: instructor?.qualification || "",
        // subjects: instructor?.subjects || "",
        experience: instructor?.experience || "",
        skills: instructor?.skills || "",
        about: instructor?.about || "",
      });
    }
    setProfileUrl(instructor?.profileUrl ?? "");
  }, [instructor]);

  useEffect(() => {
    fetchInstructor();
  }, [updated]);

  const formik = useFormik({
    initialValues: {
      email: instructor?.email || "",
      firstName: instructor?.firstName || "",
      lastName: instructor?.lastName || "",
      mobile: instructor?.mobile || "",
      qualification: instructor?.qualification || "",
      // subjects: instructor?.subjects || "",
      experience: instructor?.experience || "",
      skills: instructor?.skills || "",
      about: instructor?.about || "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (profileInfo: UpdateProfileInfo) => {
    try {
      const formData = new FormData();
      if (profileInfo.profilePic) {
        formData.append("image", profileInfo.profilePic);
      }
      formData.append("email", profileInfo.email || "");
      formData.append("firstName", profileInfo.firstName || "");
      formData.append("lastName", profileInfo.lastName || "");
      formData.append("mobile", profileInfo.mobile || "");
      formData.append("qualification",profileInfo.qualification||"")
      formData.append("experience",profileInfo.experience||"")
      formData.append("skills",profileInfo.skills||"")

      const response = await updateProfile(formData);
      // formik.resetForm();  
      setPreviewImage(null);
      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      setUpdated(!updated);
      setEditMode(false);
      toast.success(response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error: any) {
      setUpdated(!updated);
      toast.error(error?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} >
      <div></div>
      <div className='p-5 flex '>
        <Avatar
          src={previewImage || profileUrl || "../profile.jpg"}
          alt='avatar'
          size='xl'
        />
        <div className='pl-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            htmlFor='file_input'
          >
            Upload profile photo
          </label>
          <input
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            id='file_input'
            onChange={handleFileChange}
            type='file'
          />
        </div>
      </div>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='firstName'
            id='floating_first_name'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            disabled={!editMode}
            onBlur={formik.handleBlur}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='floating_first_name'
            className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
              formik.values.firstName ? "peer-placeholder-shown:scale-100" : ""
            } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
          >
            First name
          </label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='lastName'
            id='floating_last_name'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!editMode}
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
          />
          <label
            htmlFor='floating_last_name'
            className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
              formik.values.lastName ? "peer-placeholder-shown:scale-100" : ""
            } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
          >
            Last name
          </label>
        </div>
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type='email'
          name='email'
          id='floating_email'
          disabled={!editMode}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
          required
        />
        <label
          htmlFor='floating_email'
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.email ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          Email address
        </label>
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type='text'
          name='mobile'
          id='floating_phone'
          disabled={!editMode}
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
          required
        />
        <label
          htmlFor='floating_phone'
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.mobile ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          Mobile
        </label>
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type='text'
          name='qualification'
          id='floating_qualification'
          disabled={!editMode}
          value={formik.values.qualification}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
          required
        />
        <label
          htmlFor='floating_qualification'
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.qualification ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          Qualifications
        </label>
      </div>
      {/* <div className='relative z-0 w-full mb-6 group'>
        <input
          type='text'
          name='subjects'
          id='floating_subject'
          disabled={!editMode}
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
          required
        />
        <label
          htmlFor='floating_subjects'
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.mobile ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          Subjects
        </label>
      </div> */}
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type='text'
          name='experience'
          id='floating_experience'
          disabled={!editMode}
          value={formik.values.experience}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
          required
        />
        <label
          htmlFor='floating_experience'
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.experience ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          Experience
        </label>
      </div>
      <div className='relative z-0 w-full mb-6 group'>
        <input
          type='text'
          name='skills'
          id='floating_skills'
          disabled={!editMode}
          value={formik.values.skills}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          placeholder=' '
          required
        />
        <label
          htmlFor='floating_skills'
          className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] ${
            formik.values.skills ? "peer-placeholder-shown:scale-100" : ""
          } peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          Skills
        </label>
      </div>
      <div className='relative pt-10 pr-1'>
        {editMode && (
          <button
            type={"submit"}
            className='text-white absolute bottom-0 right-0  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
