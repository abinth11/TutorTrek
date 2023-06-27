import { useState, useEffect } from 'react';

const useApiData = <T>(apiCall: (...args: any[]) => Promise<T>, ...args: any[]): [T | null, boolean, boolean, any] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let timerId:any;
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await apiCall(...args);
        setData(response);
      } catch (error: any) {
        setIsError(true);
        setError(error);
      }
      timerId = setTimeout(()=>{
        setIsLoading(false);
      },2000)
    };

    fetchData();
  }, []);

  return [data, isLoading, isError, error];
};

export default useApiData;
