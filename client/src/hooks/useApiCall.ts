import { useState, useEffect } from 'react';

type RefreshDataFunction = () => void;

interface ApiDataResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: any;
  refreshData: RefreshDataFunction;
}

const useApiData = <T>(apiCall: (...args: any[]) => Promise<T>, ...args: any[]): ApiDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  
  const refreshData = () => {
    setRefreshFlag(!refreshFlag);
  };

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
  }, [refreshFlag, ...args]); // Include the refreshFlag and args in the dependency array

  return {
    data,
    isLoading,
    isError,
    error,
    refreshData,
  };
};

export default useApiData;
