
 export const client_id = '626927107662-n6cdvrf87lfrpa8kbhtt285mac9klfmg.apps.googleusercontent.com'
 export const redirect_uri = 'http://localhost:3000'
 const CONSTANTS_COMMON = {
    API_BASE_URL: 'http://localhost:4000',
    GOOGLE_URL_FOR_LOGIN:`https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=openid%20email%20profile`

 }

//  <button
//         className='flex mb-4 w-full justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
//         type='button'
//         onClick={handleSignInWithGoogle}
//       >
//         <div className='flex items-center'>
//           <img
//             className='h-5 w-5 mr-2'
//             src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
//             alt='Google Logo'
//           />
//           <span>Sign In with Google</span>
//         </div>
//       </button>

// const handleSignInWithGoogle = () => {
//    const width = 450;
//    const height = 550;
//    const left = window.innerWidth / 2 - width / 2 - 10;
//    const top = window.innerHeight / 2 - height / 2 + 40; // Adjust the value here
//    const options = `width=${width},height=${height},left=${left},top=${top}`;
//    window.open(
//      CONSTANTS_COMMON.GOOGLE_URL_FOR_LOGIN,
//      "Google Sign-In",
//      options
//    );
//  };

 export default CONSTANTS_COMMON