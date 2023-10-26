import { createContext } from "react";
// type DataContextValue = {
//   dataItem: null | ,
//   type: "unset",
//   url: null
// }
const defaultDataCotext = {
  dataItem: null,
  type: "unset",
  url: null
}

const DataContext = createContext(defaultDataCotext)

export const DataProvider = ({children}: {children: React.ReactNode}) => (
  <DataContext.Provider value={{...defaultDataCotext, dataItem: "default string"}
  }>
    {children}
  </DataContext.Provider>
)

export default DataContext