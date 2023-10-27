import { memo } from "react"
import { Text, Pressable, Platform, StyleSheet } from "react-native"
import { BSON } from "realm"
import { AntDesignIconWrapper } from "../Icon"

import colors from "../../style/colors"
import Dimensions from "../../style/Dimensions"
import { ScanRecord } from "../../type/data"
import styles from "../../style/components/recordItem.style"

const { scale } = Dimensions
console.log(`The scale ${scale}`)

// export interface RecordDataItem {
//   _id: BSON.ObjectId
//   description: string,
//   isVerified: boolean;
//   createdAt: Date,
//   location: Location,
//   url: string,
// }
interface RecordItemProps {
  dataItem: ScanRecord
  description: string
  isVerified?: boolean
  navigateToDetail?: (detailInfo: any) => void
  onToggleRecordStatus: () => void
  onDelete?: () => void
}

function clgWrapper(message: string) {
  console.log("********Starter of the block*********")
  console.log(message)
  console.log("*********Ender of the block**********")
}

function RecordItem({
  dataItem,
  description,
  isVerified,
  navigateToDetail,
  onDelete,
}: RecordItemProps) {
  console.log(`Data in recordItem`, JSON.stringify(dataItem))
  const naviAction =
    navigateToDetail || (() => alert("No action bind for item click"))
  return (
    <Pressable style={[styles.item, { height: 25 * scale }]}>
      <Pressable
        style={[
          styles.status,
          isVerified && styles.completed,
          {
            alignItems: "center",
          },
        ]}
      >
        {/* <Text style={styles.icon}>{isVerified ? "✓" : "○"}</Text> */}
        <AntDesignIconWrapper name="checkcircle" />
      </Pressable>
      <Pressable
        style={styles.contentContainer}
        onPress={() => {
          console.log("Dataitem in record item", dataItem)
          naviAction(dataItem.content)
        }}
      >
        <Text numberOfLines={1} style={styles.description}>
          {dataItem.content}
        </Text>
        <Text numberOfLines={1} style={styles.dateText}>
          {typeof dataItem.createdAt}
        </Text>
      </Pressable>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </Pressable>
  )
}

// We want to make sure only tasks that change are rerendered
const shouldNotRerender = (
  prevProps: RecordItemProps,
  nextProps: RecordItemProps,
) =>
  prevProps.description === nextProps.description &&
  prevProps.isVerified === nextProps.isVerified

export default memo(RecordItem, shouldNotRerender)
