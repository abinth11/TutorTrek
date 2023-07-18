import React,{useEffect} from "react";
import { Avatar } from "@material-tailwind/react";
import ProfileForm from "./ProfileFrom";
import ChangePasswordForm from "./ChagePasswordForm";
import { fetchStudentData } from "../../../redux/reducers/studentSlice";
import { useDispatch } from "react-redux";

type Props = {};

const MyProfile: React.FC = (props: Props) => {
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);
  return (
    <div className='w-full flex justify-center items-center '>
      <div className='w-11/12'>
        <div>
          <div className='pt-5 pb-6 w-full'>
            <h2 className='text-3xl font-semibold text-customFontColorBlack'>
              Edit profile info
            </h2>
          </div>
        </div>
        <div className='flex gap-x-10 h-full pb-10'>
          <div className='border   w-7/12 h-full rounded-md  bg-white border-gray-300'>
            <h3 className='pl-5 pt-5 text-lg text-customFontColorBlack font-semibold'>
              Account Info
            </h3> 
            <div className='p-6'>
              <ProfileForm />
            </div>
          </div>
          <div className='border  pt-5 pb-10  w-5/12 h-full rounded-md  bg-white border-gray-300'>
            <h3 className='pl-5  text-lg text-customFontColorBlack font-semibold'>
              Change password
            </h3>
            <div className="p-6">
            <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
