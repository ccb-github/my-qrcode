import React from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox, List } from "react-native-paper"


export default function ProfileField(){
  return (
    <List.Item
      title="Headline"
      description="Supporting text that is long enough to fill up multiple lines in the item"
      right={() => <Checkbox status="checked" />}
    />
  );
};

