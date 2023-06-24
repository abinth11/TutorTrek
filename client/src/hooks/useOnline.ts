import { useEffect, useState } from 'react';
const useIsOnline = () => {

  const [isOnline, setIsOnline] = useState(true);
const handleOnline = () => {setIsOnline(true)};
const handleOffline = () =>{ setIsOnline(false)};
  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });
  return isOnline;
};
export default useIsOnline;