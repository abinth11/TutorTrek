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
    </div>
  );
}

export default GoogleAuthComponent;
