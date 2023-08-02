import React, { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import ChangePasswordForm from "./password-form";
import { fetchStudentData } from "../../../redux/reducers/studentSlice";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";

type Props = {};

const InstructorProfile: React.FC = (props: Props) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  const handleEditClick = () => {
    setEditMode(true);  
  };

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-11/12'>
        <div>
          <div className='pt-5 pb-6 w-full'>
            <h2 className='text-3xl font-semibold text-customFontColorBlack'>
              Edit profile info
            </h2>
          </div>  
        </div>
        <div className='flex flex-col md:flex-row gap-x-10 h-full pb-20'>
          <div className='border md:w-7/12 w-full h-full rounded-md bg-white border-gray-300'>
            <div className='flex justify-between'>
              <h3 className='pl-5 pt-5 text-lg text-customFontColorBlack font-semibold'>
                Account Info
              </h3>
              <div>
                <button className='p-5' onClick={handleEditClick}>
                  <FiEdit className='text-customFontColorBlack text-lg' />
                </button>
              </div>  
            </div>
            <div className='p-6'>
              <ProfileForm editMode={editMode} setEditMode={setEditMode} />
            </div>  
          </div>   
          <div className='border my-7 md:mt-0 pt-5 pb-10 md:w-5/12 w-full h-full rounded-md bg-white border-gray-300'>
            <h3 className='pl-5 text-lg text-customFontColorBlack font-semibold'>
              Change password
            </h3>
            <div className='p-6'>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>    
    </div>        
  );
};

export default InstructorProfile;
