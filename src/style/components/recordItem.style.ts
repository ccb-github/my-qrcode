import { StyleSheet, Platform } from "react-native"
import colors from "../colors"

const styles = StyleSheet.create({
  item: {
    alignSelf: "stretch",
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
  },
  dateText: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
  },
  status: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteButton: {
    justifyContent: "center",
  },
  deleteText: {
    marginHorizontal: 10,
    color: colors.gray,
    fontSize: 17,
  },
  icon: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
})

export default styles
