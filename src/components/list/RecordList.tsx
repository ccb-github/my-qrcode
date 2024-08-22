import { View, FlatList, StyleSheet } from "react-native"
import RecordItem from "./item/RecordItem"
import { type ScanRecord } from "../../type/data"

type RecordListProps = {
  records: readonly ScanRecord[]
  onToggleRecordStatus: (record: ScanRecord) => Promise<void>
  onDeleteRecord: (key: string) => Promise<void>
  detailNavigate: (detailInfo: {
    data: any
    type: string
  }) => void | Promise<void>
}

function RecordList({
  records,
  onToggleRecordStatus,
  onDeleteRecord,
  detailNavigate,
}: RecordListProps) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={records}
        extraData={records.length}
        keyExtractor={(record) => Math.random().toLocaleString()}
        renderItem={({ item }) => {
          return (
            <RecordItem
              dataItem={item}
              description={item.content}
              onToggleRecordStatus={async () => {
                onToggleRecordStatus(item).catch((error) => {
                  throw error
                })
              }}
              onDelete={async () => {
                onDeleteRecord(item.id).catch((error) => {
                  throw error
                })
              }}
              navigateToDetail={() => {
                void detailNavigate({
                  data: item,
                  type: item.type,
                })
              }}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
  },
})

export { RecordList }
