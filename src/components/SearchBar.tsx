import { useRef, useState } from "react";
import { Searchbar as SearchbarOri} from "react-native-paper";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchQueryRef = useRef('')
    const onChangeSearch = (query: string) => searchQueryRef.current = query
  
    return (
      <SearchbarOri
        placeholder="Search" 
        value={searchQueryRef.current}
      />
    );
  };
  
  export default SearchBar;