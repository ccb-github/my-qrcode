import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox, List, Switch } from "react-native-paper"

const CenteredCheckbox = () => (
  <View style={styles.centered}>
    <Checkbox status="checked" />
  </View>
);
export default function ToggleableTextInput(props: {content: string}){
  const [isSwitchOn, onToggleSwitch] = useState(props.content === "false")
  return (
    <List.Item
      title="Headline"
      description="Supporting text that is long enough to fill up multiple lines in the item"
      right={_ => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    alignSelf: 'flex-start',
  },
});