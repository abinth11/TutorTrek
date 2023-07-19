import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleLogin } from "../../api/endpoints/auth/studentAuth";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/authSlice";

function GoogleAuthComponent(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const errorMessage = (): void => {
    console.log("error from google login");
  };

  const handleSignInWithGoogle = (credential: string) => {
    googleLogin(credential)
      .then((response: any) => {
        console.log(response)
        const {
          accessToken,
          refreshToken,
        }: { accessToken: string; refreshToken: string } = response
        dispatch(setToken({ accessToken, refreshToken }));
        toast.success(response?.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        response.status==="success"&&navigate("/");
      })
      .catch((error:any) => {
        toast.error(error?.data?.message, {
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
