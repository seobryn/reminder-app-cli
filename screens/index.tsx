import React, {useEffect, useState} from 'react';
import {Reminder} from '../types/reminder';
import {useStorage} from '../hooks/storage';
import {FlatList, StyleSheet} from 'react-native';
import {ReminderItem} from '../components/ReminderItem';
import {useNavigation} from '@react-navigation/native';
import {ThemedView} from '../components/ThemedView';
import {ThemedText} from '../components/ThemedText';
import {useColorScheme} from '../hooks/theme/useColorScheme';

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const storage = useStorage();
  const navigation = useNavigation<any>();
  const colorScheme = useColorScheme();

  useEffect(() => {
    storage.getItem<Reminder[]>('reminders').then(setReminders);
  }, [storage]);

  const onCheckItem = (reminder: Reminder) => {
    reminder.completed = !reminder.completed;
    storage.setItem('reminders', reminders);
  };

  return (
    <FlatList
      style={colorScheme === 'light' ? styles.listStyle : styles.listStyleDark}
      data={reminders}
      renderItem={({item}) => (
        <ReminderItem
          item={item}
          selected={item.completed}
          onCheck={() => onCheckItem(item)}
          onLongPress={() => {
            navigation.navigate('deleteReminder', {id: item.id});
          }}
        />
      )}
      // eslint-disable-next-line react/no-unstable-nested-components
      ListEmptyComponent={() => (
        <ThemedView style={styles.emptyReminderContainer}>
          <ThemedText type="subtitle">No reminders found</ThemedText>
          <ThemedText>Tap new to add one</ThemedText>
        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listStyleDark: {
    backgroundColor: '#333',
  },
  listStyle: {
    backgroundColor: 'white',
  },
  emptyReminderContainer: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
    backgroundColor: 'transparent',
    paddingVertical: 64,
  },
});
