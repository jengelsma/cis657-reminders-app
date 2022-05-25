import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { CheckBox } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import  Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RemindersScreen = ({ route, navigation }) => {

  const items = [
    { text: "get groceries", done: false },
    { text: "feed dog", done: false },
    { text: "take out trash", done: false },
  ];

  const [reminders, setReminders] = useState(items.sort(comparator));

  const comparator = (item1, item2) => {
    return item1.text.toLowerCase() > item2.text.toLowerCase();
  };

  const renderReminder = ({ index, item }) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          let newArr = [...reminders];
          newArr[index] = { ...item, done: !item.done };
          setReminders(newArr.sort(comparator));
        }}
        onLongPress={() => {
          let newArr = reminders.filter((val, idx) => {
            return idx == index ? false : true;
          });
          setReminders(newArr.sort(comparator));
          Toast.show(`Deleted ${item.text}!`, {
            duration: Toast.durations.LONG,
            animation: true,
            hideOnPress: true,
          });
        }}
      />
    );
  };

  useEffect(() => {
    if (route.params?.text) {
      setReminders([...reminders, route.params].sort(comparator));
    }
  }, [route.params?.text]);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddReminder');
          }}
        >
          <Feather style={{ marginRight: 10 }} name="edit" size={24} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <FlatList
      keyExtractor={(item) => item.text}
      data={reminders}
      renderItem={renderReminder}
    />
  );  




};

const styles = StyleSheet.create({
});

export default RemindersScreen;

