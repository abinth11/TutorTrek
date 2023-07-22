import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
}

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  // Add other options as needed...
];

interface Props {
  handleSelect: (selectedOption: any) => void;
}

const CourseSearchBar: React.FC<Props> = ({ handleSelect }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<ColourOption[]>([]);

  const getSuggestions = (inputValue: string) => {
    const inputValueLower = inputValue.trim().toLowerCase();
    return colourOptions.filter(
      (option) => option.label.toLowerCase().includes(inputValueLower)
    );    
  };

  const getSuggestionValue = (suggestion: ColourOption) => suggestion.label;
     
  const renderSuggestion = (suggestion: ColourOption) => (
    <div>{suggestion.label}</div>
  );

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (
    event: any,
    { suggestionValue }: { suggestionValue: string }
  ) => {
    handleSelect(suggestionValue);
  };

  const inputProps = {
    placeholder: "Search...",
    value,
    onChange: (event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
    },
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default CourseSearchBar;
