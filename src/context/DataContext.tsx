import { createContext } from "react"
type DataContextValue = {
  dataItem: unknown
  type: string
  url: string | null
}
const defaultDataContext = {
  dataItem: null,
  type: "unset",
  url: null,
}

const DataContext = createContext<DataContextValue>(defaultDataContext)

export const DataProvider = ({ children }: { children: React.ReactNode }) => (
  <DataContext.Provider
    value={{ ...defaultDataContext, dataItem: "default string" }}
  >
    {children}
  </DataContext.Provider>
)

export default DataContext
