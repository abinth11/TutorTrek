import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../api/endpoints/category";
import { ApiResponseCategory } from "../../../api/types/apiResponses/apiResponseCategory";
import Select from "react-select";
import { InstructorApiResponse } from "../../../api/types/apiResponses/apiResponseInstructors";

interface Props {
  setFilter:(value:string)=>void,
  // setFilteredAndSearchedInstructors:(value:InstructorApiResponse[])=>void,
  // filteredInstructors:InstructorApiResponse[]
}

const FilterInstructorSelectBox:React.FC<Props> = ({setFilter})=> {
  const [categories, setCategories] = useState<ApiResponseCategory[] | null>(
    null
  );

  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      console.log(response);
      setCategories(response?.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleSelectChange = (selectedOption: any) => {
    setFilter(selectedOption?.value || "");
    // filteredInstructors?.filter((instructor=>instructor.subjects.includes(selectedOption)));
  };

  return (
    <>
      {categories && (
        <Select
          className='basic-single w-1/2 p-2'
          classNamePrefix='select'
          defaultValue={null}
          isLoading={false}
          isClearable={true}
          isSearchable={true}
          name='color'
          onChange={handleSelectChange}
          placeholder='Filter by Expertise'
          options={categories.map((category) => ({
            value: category?.name,
            label: category?.name,
          }))}
        />
      )}
      <div
        style={{
          color: "hsl(0, 0%, 40%)",
          display: "inline-block",
          fontSize: 12,
          fontStyle: "italic",
          marginTop: "1em",
        }}
      ></div>
    </>
  );
};
export default FilterInstructorSelectBox
