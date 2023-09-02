import { View, FlatList, StyleSheet } from 'react-native';
import RecordItem from './RecordItem';
import { ScanRecord } from '../../type/data';

interface RecordListProps {
  records: readonly ScanRecord[];
  onToggleRecordStatus: (record: ScanRecord) => void;
  onDeleteRecord: (key: string) => void;
  detailNavigate: (detailInfo: {data: any, type: string}) => void;
}



function RecordList({records, onToggleRecordStatus, onDeleteRecord, detailNavigate}: RecordListProps) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={records}
        extraData={records.length}
        keyExtractor={record => Math.random().toLocaleString()}
        renderItem={({item}) => {  
          return (
            <RecordItem
              dataItem={item}
              description={item.content}
              onToggleRecordStatus={() => onToggleRecordStatus(item)}
              onDelete={() => onDeleteRecord(item.id)}
              navigateToDetail={detailNavigate} 
            />
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export {
  RecordList
};
