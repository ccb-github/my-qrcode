import { memo } from "react"
import { Text, Pressable, Platform, StyleSheet } from "react-native"
import { type BSON } from "realm"

import colors from "#/style/colors"
import Dimensions from "#/style/Dimensions"

const { scale } = Dimensions

export type RecordDataItem = {
  _id: BSON.ObjectId
  description: string
  isVerified: boolean
  createdAt: Date
  location: Location
  url: string
}
type RecordItemProps = {
  dataItem: unknown
  description: string
  isVerified: boolean
  navigateToDetail?: (detailInfo: any) => void
  onToggleRecordStatus: () => void
  onDelete?: () => void
}

function RecordItem({
  dataItem,
  description,
  isVerified,
  navigateToDetail,
  onDelete,
}: RecordItemProps) {
  console.log("Data in recordItem", JSON.stringify(dataItem))
  return (
    <Pressable style={[styles.item, { height: 25 * scale }]}>
      <Pressable style={[styles.status, isVerified && styles.completed]}>
        <Text style={styles.icon}>{isVerified ? "✓" : "○"}</Text>
      </Pressable>
      <Pressable
        style={styles.descriptionContainer}
        onPress={() => {
          console.log("DataItem in recordItem", dataItem)
          navigateToDetail?.(JSON.stringify(dataItem))
        }}
      >
        <Text numberOfLines={1} style={styles.description}>
          {description}
        </Text>
      </Pressable>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </Pressable>
  )
}

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
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
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

// We want to make sure only tasks that change are rerendered
const shouldNotRerender = (
  prevProps: RecordItemProps,
  nextProps: RecordItemProps,
) =>
  prevProps.description === nextProps.description &&
  prevProps.isVerified === nextProps.isVerified

export default memo(RecordItem, shouldNotRerender)
