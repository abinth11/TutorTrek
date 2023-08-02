import React, { useState, ChangeEvent } from 'react';
import { BiSearch } from 'react-icons/bi';
const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused,setIsFocussed] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Perform search or fetch suggestions based on the entered value
    // For simplicity, let's assume we have a function called `fetchSuggestions`
    // that returns an array of suggestions based on the search term
    // const newSuggestions = fetchSuggestions(value);
    const newSuggestions = ['Web Dev','Mobile Dev','Android','MERN stack',"React basics"]

    setSuggestions(newSuggestions);
  };
  const handleInputFocus = () =>{
    setIsFocussed(true)
  }
  const handleInputBlur = () =>{
    setIsFocussed(false)
  }

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="relative">
  <input
    type="text"
    value={searchTerm}
    onChange={handleInputChange}
    onFocus={handleInputFocus}
    onBlur={handleInputBlur}
    placeholder="Search courses..."
    className="pl-10 pr-4 py-2 w-64 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  />
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <BiSearch className="h-5 w-5 text-gray-400" />
  </div>
</div>
      {isFocused && filteredSuggestions.length > 0 ? (
        <ul className="mt-2 py-1 max-h-48 overflow-y-auto absolute z-10 w-full">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} className="py-1">
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        isFocused && (
          <div className="mt-2 py-1 absolute z-10 w-full bg-white border border-gray-300 rounded-md px-4">
            <p className="text-gray-500">No results found.</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchBar;
