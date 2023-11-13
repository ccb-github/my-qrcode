import { useRef } from "react"
import { Searchbar as SearchbarOri } from "react-native-paper"

const SearchBar = () => {
  const searchQueryRef = useRef("")
  const onChangeSearch = (query: string) => (searchQueryRef.current = query)

  return (
    <SearchbarOri
      placeholder="Search"
      value={searchQueryRef.current}
      onChange={(changeEvent) => {
        onChangeSearch(changeEvent.nativeEvent.text)
      }}
    />
  )
}

export default SearchBar
