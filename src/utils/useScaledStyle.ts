import { useEffect, useState } from "react"
import { TextStyle, ViewStyle } from "react-native"

import Realm, { type ConnectionState } from "realm"

export default function useScaledStyle(originStyle: ViewStyle | TextStyle) {
  const [scaleKeys] = useState<Array<keyof (ViewStyle | TextStyle)>>([
    "height",
    "borderEndEndRadius",
    "width",
  ])

  return Object.keys(originStyle).reduce((pv, cv) => ({
    ...pv,
    
  }), {})
}
