import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePreventBackButton = (isLoggedIn: boolean): void => {
  const backPressCountRef = useRef(0);
  const navigate = useNavigate()
  const location  = useLocation()

  useEffect(() => {
    const handleBackButton = (e: PopStateEvent): void => {
      e.preventDefault();
      if (!isLoggedIn) {
        window.history.forward();
      } else {
        if(location.pathname==='/login'){
            navigate('/')
        }
        backPressCountRef.current++;

        if (backPressCountRef.current === 2) {
          // Redirect the user to the browser's home page
          window.location.href = '/';
        } else {
          window.history.forward();
        }
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [isLoggedIn]);
};

export default usePreventBackButton;
