import { memo } from "react"
import { Text, Pressable, Alert } from "react-native"
import { AntDesignIconWrapper } from "#/components/Icon"

import Dimensions from "#/style/Dimensions"
import type { ScanRecord } from "#/type/data"
import styles from "#/style/components/recordItem.style"

const { scale } = Dimensions
console.log(`The scale ${scale}`)

type RecordItemProps = {
  dataItem: ScanRecord
  description: string
  isVerified?: boolean
  navigateToDetail?: (detailInfo: unknown) => Promise<void> | void
  onToggleRecordStatus: () => Promise<void>
  onDelete?: () => Promise<void>
}

function RecordItem({
  dataItem,
  isVerified,
  navigateToDetail,
  onDelete,
}: RecordItemProps) {
  const naviAction =
    navigateToDetail ??
    (() => {
      Alert.alert("No action bind for item click")
    })
  return (
    <Pressable style={[styles.item, { height: 25 * scale }]}>
      <Pressable
        style={[
          styles.status,
          (isVerified ?? false) && styles.completed,
          {
            alignItems: "center",
          },
        ]}
      >
        <AntDesignIconWrapper name="checkcircle" />
      </Pressable>
      <Pressable
        style={styles.contentContainer}
        onPress={() => {
          console.log("Dataitem in record item", dataItem)
          // TODO need better handling the async function
          void naviAction(dataItem.content)
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
