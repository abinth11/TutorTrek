import React,{useState,useEffect} from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getAllCategories } from "../../../api/endpoints/category";
import { ApiResponseCategory } from "../../../api/types/apiResponses/apiResponseCategory";
import { toast } from "react-toastify";

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

const animatedComponents = makeAnimated();
interface Props {
  handleSelect:(value:string)=>void,
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
      isMulti
      placeholder='Filter by Categories'
      options={categories?.map((category) => ({
        value: category?.name,
        label: category?.name,
      }))}    />
  );
};

export default FilterCourseSelectBox;
