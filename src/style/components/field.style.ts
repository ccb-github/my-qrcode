import { StyleSheet } from "react-native"

const FieldStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  nameFieldView: {
    flex: 1,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  valueFieldView: {
    flex: 1,
  },
})

const FieldTextStyles = StyleSheet.create({
  nameFieldText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  valueFieldText: {
    fontSize: 25,
  },
})
const ObjectFieldStyles = StyleSheet.create({
  status: {
    justifyContent: "center",
    backgroundColor: "purple",
    aspectRatio: 1,
  },
  textExpandIcon: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  /*This style is for object field */
  firstRow: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  fieldRow: {
    flex: 1,
    flexDirection: "column",
  },
  expandWidget: {
    flexDirection: "column",
  },
})

export { FieldStyles, ObjectFieldStyles, FieldTextStyles }
