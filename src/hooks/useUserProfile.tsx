import { useUser } from "@realm/react"
import { useEffect, useState } from "react"
import { type UserProfile } from "../type/user"

export default function useUserProfile() {
  const user = useUser()
  const [loaded, setLoaded] = useState(false)
  const [result, setResult] = useState<Partial<UserProfile>>({})
  const fetchUserProfile = async () => {
    const resultData = (await user?.refreshCustomData()) as Partial<UserProfile>
    setResult(resultData)
    setLoaded(true)
  }
  useEffect(() => {
    fetchUserProfile().catch((error) => {
      console.error(error)
      throw error
    })
  }, [])
  return { result, loaded }
}
