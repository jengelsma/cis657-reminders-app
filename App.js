import AddReminderScreen from "./screens/AddReminderScreen";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RemindersScreen from "./screens/RemindersScreen";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Reminders" component={RemindersScreen} />
        <Stack.Screen
          title="Add Reminder"
          name="AddReminder"
          component={AddReminderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
