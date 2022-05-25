import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Input } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";

const AddReminderScreen = ({ route, navigation }) => {

  const [reminder, setReminder] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reminders", { text: reminder, done: false });
          }}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Reminders");
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
      <Input
        placeholder="Enter reminder"
        value={reminder}
        onChangeText={setReminder}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddReminderScreen;
