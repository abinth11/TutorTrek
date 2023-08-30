import React, { useEffect, useState } from "react";
import ProfileForm from "./profile-from";
import ChangePasswordForm from "./chage-password-form";
import { fetchStudentData } from "../../../redux/reducers/studentSlice";
import { useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";

const MyProfile: React.FC = () => {
  const dispatch = useDispatch();
  // const [editMode, setEditMode] = useState(false);
  // const [editType, setEditType] = useState("");
  const [editState, setEditState] = useState({ mode: false, type: "" });

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  const handleEditClick = (type: string) => {
    setEditState({ mode: true, type: type });
  };

  const handleEditModeClose = () => {
    setEditState({ mode: false, type: "" });
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
        <div className='flex flex-col md:flex-row gap-x-10 h-full pb-10'>
          <div className='border md:w-7/12 w-full h-full rounded-md bg-white border-gray-300'>
            <div className='flex justify-between'>
              <h3 className='pl-5 pt-5 text-lg text-customFontColorBlack font-semibold'>
                Account Info
              </h3>
              <div>
                <button
                  className='p-5'
                  onClick={() => handleEditClick("account")}
                >
                  <FiEdit className='text-customFontColorBlack text-lg' />
                </button>
              </div>
            </div>
            <div className='p-6'>
              <ProfileForm
                editMode={editState.mode && editState.type === "account"}
                setEditMode={handleEditModeClose}
              />
            </div>
          </div>
          <div className='border my-7 md:mt-0 pt-5 pb-10 md:w-5/12 w-full h-full rounded-md bg-white border-gray-300'>
            <div className='flex justify-between'>
              <h3 className='pl-5 text-lg text-customFontColorBlack font-semibold'>
                Change password
              </h3>
              <button
                className='pr-3'
                onClick={() => handleEditClick("password")}
              >
                <FiEdit className='text-customFontColorBlack text-lg' />
              </button>
            </div>
            <div className='p-6'>
              <ChangePasswordForm
                editMode={editState.mode && editState.type === "password"}
                setEditMode={handleEditModeClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
