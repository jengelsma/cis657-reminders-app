import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  initRemindersDB,
  setupReminderListener,
  storeReminderItem,
} from "../helpers/fb-reminders";

import { CheckBox } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import  Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RemindersScreen = ({ route, navigation }) => {

  const [reminders, setReminders] = useState([]);


  const [display, setDisplay] = useState("All");

  const comparator = (item1, item2) => {
    return item1.text.toLowerCase() > item2.text.toLowerCase();
  };

  const displayFilter = (item) => {
    if (display === "All") {
      return true;
    } else if (display === "Done") {
      return item.done ? true : false;
    } else {
      return item.done ? false : true;
    }
  }; 

  const addRemindersNotDisplayed = (newArr) => {
    if (display === "Not Done") {
      newArr = newArr.concat(
        reminders.filter((i) => {
          return i.done;
        })
      );
    } else if (display === "Done") {
      newArr = newArr.concat(
        reminders.filter((i) => {
          return !i.done;
        })
      );
    }
    return newArr;
  };

  const renderReminder = ({ index, item }) => {
    return (
      <CheckBox
        title={item.text}
        checked={item.done}
        onPress={() => {
          var newArr = [...reminders.filter(displayFilter)];
          newArr[index] = { text: item.text, done: !item.done };
          addRemindersNotDisplayed(newArr);
          setReminders(newArr.sort(comparator));
        }}
        onLongPress={() => {
          let subset = reminders.filter(displayFilter);
          let newArr = subset.filter((val, idx) => {
            return idx == index ? false : true;
          });
          addRemindersNotDisplayed(newArr)
          setReminders(newArr.sort(comparator));
          Toast.show(`Deleted ${item.text}!`, {
            duration: Toast.durations.SHORT,
            animation: true,
            hideOnPress: true,
          });
        }}
      />
    );
  };

  useEffect(() => {
    try {
      initRemindersDB();
    } catch (err) {
      console.log(err);
    }
    setupReminderListener((items) => {
      console.log("setting state with: ", items);
      setReminders(items.sort(comparator));
    });
  }, []);
  
  useEffect(() => {
    if (route.params?.text) {
      storeReminderItem(route.params);
    }
  }, [route.params?.text]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (display === "All") {
              setDisplay("Not Done");
            } else if (display == "Not Done") {
              setDisplay("Done");
            } else {
              setDisplay("All");
            }
          }}
        >
          <Text style={styles.textStyle}> {display} </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddReminder");
          }}
        >
          <Feather style={{ marginRight: 10 }} name="edit" size={24} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <FlatList
      data={reminders.filter(displayFilter)}
      renderItem={renderReminder}
    />
);

};

const styles = StyleSheet.create({
});

export default RemindersScreen;

