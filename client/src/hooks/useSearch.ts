import { useState, useEffect } from "react";
import { GetCourseByInstructorInterface } from "../api/types/apiResponses/api-response-instructors";
import { debounce} from "lodash";

const useSearch = (
    data: GetCourseByInstructorInterface[],
    query: string
  ): GetCourseByInstructorInterface[] => {
    const [searchResults, setSearchResults] = useState<GetCourseByInstructorInterface[]>([]);
  
    useEffect(() => {
      const delay = 300; // Debounce delay in milliseconds
      const debounceSearch = debounce(() => {
        if (query.trim() !== "") {
          const regex = new RegExp(query, "i"); // Case-insensitive regex matching
          const filteredResults = data.filter((item) => {
            // Modify this condition according to your search criteria
            return regex.test(item.title);
          });
          setSearchResults(filteredResults);
        } else {
          setSearchResults([]);
        }
      }, delay);
  
      debounceSearch();
  
      return () => {
        debounceSearch.cancel();
      };
    }, [data, query]);
  
    return searchResults;
  };
  export default useSearch
  