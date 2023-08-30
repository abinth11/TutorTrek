import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getAllCategories } from "../../../api/endpoints/category";
import { ApiResponseCategory } from "../../../api/types/apiResponses/api-response-category";
import { toast } from "react-toastify";

const animatedComponents = makeAnimated();
interface Props {
  handleSelect: (value: string) => void;
}
const FilterCourseSelectBox: React.FC<Props> = ({ handleSelect }) => {
  const [categories, setCategories] = useState<ApiResponseCategory[] | null>(
    null
  );

  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response?.data);
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  const handleSelectChange = (selectedOption: any) => {
    handleSelect(selectedOption?.value || "");
  };
  return (
    <Select
      className='basic-single lg:w-1/2  p-4'
      closeMenuOnSelect={false}
      classNamePrefix='select'
      components={animatedComponents}
      defaultValue={null}
      isClearable={true}
      isSearchable={true}
      name='color'
      onChange={handleSelectChange}
      placeholder='Filter by Categories'
      options={categories?.map((category) => ({
        value: category?.name,
        label: category?.name,
      }))}
    />
  );
};

export default FilterCourseSelectBox;
