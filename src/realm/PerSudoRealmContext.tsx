import { type Realm } from "@realm/react"

import React, { useEffect } from "react"
type FallBackUseRealm<T> = (
  type: string | ((new (...args: any) => T) & Realm.ObjectClass<any>),
) => void
const fallbackUseRealm: FallBackUseRealm<"Product"> = () => {
  return `A fake realm with ${type}`
}
type UseQuery = <T>(
  type: string | ((new (...args: any) => T) & Realm.ObjectClass<any>),
) => void
const fallbackUseQuery: UseQuery = () => {}

const RealmContext = React.createContext({
  useRealm: fallbackUseRealm,
  useQuery: fallbackUseQuery,
  useObject: () => {},
})
export function RealmProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {})
  return (
    <RealmContext.Provider
      value={{
        useRealm: fallbackUseRealm,
        useQuery: fallbackUseQuery,
        useObject: () => {},
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}
export default RealmContext
