import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";

const interestsOptions = [
  { value: "Option 1", label: "Option 1" },
  { value: "Option 2", label: "Option 2" },
  { value: "Option 3", label: "Option 3" },
  // Add more options as needed
];

const SelectInterest: React.FC = () => {

  return (
    <div className="mt-2">
      <label
        htmlFor='interests'
        className='block text-sm font-medium leading-5 text-gray-700'
      >
        Interests
      </label>
      <Field
        id='interests'
        name='interests'
        component={CustomSelect}
        options={interestsOptions}
      />
      <ErrorMessage
        name='interests'
        component='div'
        className='text-red-500 text-xs mt-1'
      />
    </div>
  );
};

const CustomSelect = ({ field, form, options, ...props }: any) => {
  const handleChange = (selectedOption: any) => {
    form.setFieldValue(field.name, selectedOption);
  };

  return (
    <Select
      {...field}
      {...props}
      options={options}
      isMulti
      onChange={handleChange}
    />
  );
};

export default SelectInterest;
