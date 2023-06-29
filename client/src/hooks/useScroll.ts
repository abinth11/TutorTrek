 import {useState,useEffect} from 'react'
 import { throttle } from 'lodash';
 const useScroll = () =>{
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    useEffect(() => {
        const handleScroll = throttle(() => {
          const currentScrollPos = window.pageYOffset;
          const scrollThreshold = 8;
    
          if (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > scrollThreshold) {
            setIsHeaderVisible(true);
          } else if (prevScrollPos < currentScrollPos && currentScrollPos - prevScrollPos > scrollThreshold) {
            setIsHeaderVisible(false);
          }
    
          setPrevScrollPos(currentScrollPos);
        }, 200); // Adjust the time interval (in milliseconds) as needed
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollPos]);

 }
 

  export default useScroll