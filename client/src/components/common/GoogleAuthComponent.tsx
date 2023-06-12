import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken } from "../../redux/reducers/studentAuthSlice";
import { googleLogin } from "../../api/endpoints/student/auth";

function GoogleAuthComponent(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSuccess = (data:string) => {
    toast.success( "Successfully logged in...", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    googleLogin(data)
  };
  const handleError = () => {
    toast.error( "Something wrong..", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      if(tokenResponse.access_token){
        handleSuccess(tokenResponse.access_token)
      }
    },
    onError: (authError) => {
      console.log(authError);
      handleError();
    },
  });

  return (
    <div className='mb-5'>
      <button
        className='flex mb-4 w-full justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        type='button'
        onClick={() => login()}
      >
        <div className='flex items-center'>
          <img
            className='h-5 w-5 mr-2'
            src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
            alt='Google Logo'
          />
          <span>Sign In with Google</span>
        </div>
      </button>
    </div>
  );
}

export default GoogleAuthComponent;
