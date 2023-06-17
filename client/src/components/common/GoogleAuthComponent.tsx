import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken } from "../../redux/reducers/studentAuthSlice";
import { googleLogin } from "../../api/endpoints/student/auth";

function GoogleAuthComponent(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = (): void => {
    console.log("error");
  };

  const handleSignInWithGoogle = (credential: string) => {
    googleLogin(credential)
      .then((response: any) => {
        toast.success(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        // setTimeout(() => {
        //   navigate("/");
        // }, 1000);
         navigate("/");
      })
      .catch((error:any) => {
        toast.error(error.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <div className='mb-5 '>
      <div className="flex justify-center">
      <GoogleLogin
        width="352px"
        size='large'
        // theme="filled_blue"
        logo_alignment="center"
        shape="pill"
        auto_select={false}
        type="standard"
        ux_mode="popup"

          onSuccess={(response) => {
            if (response) {
              handleSignInWithGoogle(response.credential ?? "empty response");
            }
          }}
          onError={errorMessage}
        />

      </div>
      {/* <button
        className='flex mb-4 w-full justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        type='button'
        onClick={() => }
      >
        <div className='flex items-center'>
          <img
            className='h-5 w-5 mr-2'
            src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
            alt='Google Logo'
          />
          <span>Sign In with Google</span>
        </div>
      </button> */}
    </div>
  );
}

export default GoogleAuthComponent;
