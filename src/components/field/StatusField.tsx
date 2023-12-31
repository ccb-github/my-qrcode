import { type BaseFieldProps } from "../../type/props"

import StringField from "./StringField"

/**
 * @description StatusField is used to display a typical status field, etc (In progress, finished)
 * @prop name - Field Name
 * @prop value - Field Value
 */
export default function StatusField(props: BaseFieldProps) {
  return <StringField {...props} />
}
