import React, {  } from 'react';
import { StyleSheet } from 'react-native';
import { MainNavigation } from "./navigation";
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Provider as PaperProvider } from "react-native-paper";


import "./lib/i18-next";
import { RealmProvider } from './realm/PerSudoRealmContext';

// Detect if the run time is expogo, etc does not support some native module.


// Detect if the run time is expogo, etc does not support some native module.
const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
console.log("Is expoGo:",isExpoGo)




export default function App() {
  
  return (
    <RealmProvider>
      <PaperProvider>
        <MainNavigation/>
      </PaperProvider>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
