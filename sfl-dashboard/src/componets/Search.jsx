import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const Search = ({
  placeholder = "Search",
  onSearchChange,
  buttonClassName,
  inputClassName,
  inputStyle,
}) => {
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="action__btn">
      <Button
        icon="pi pi-search"
        className={`search_icon_btn text-xs md:text-sm ${activeSearchBar ? "search_active" : ""} ${buttonClassName}`}
        onClick={() => setActiveSearchBar(!activeSearchBar)}
      />
      <InputText
        className={`search_bar ${activeSearchBar ? "active_search" : ""} ${inputClassName}`}
        value={search}
        onChange={handleInputChange}
        onBlur={() => setActiveSearchBar(false)}
        placeholder={placeholder}
        style={{ width: "250px", ...inputStyle }}
      />
    </div>
  );
};

export default Search;
