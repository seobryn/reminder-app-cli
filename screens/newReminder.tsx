import React from 'react';
import {ThemedText} from '../components/ThemedText';
import {ThemedView} from '../components/ThemedView';
import {useStorage} from '../hooks/storage';
import {Reminder} from '../types/reminder';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {useColorScheme} from '../hooks/theme/useColorScheme';

export default function AddReminderLayout() {
  const remindersRef = useRef<Reminder[]>();
  const storage = useStorage();
  const [reminderInfo, setReminderInfo] = useState<
    Partial<Reminder> | undefined
  >();

  const navigator = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    storage.getItem<Reminder[]>('reminders').then(reminders => {
      remindersRef.current = reminders;
    });
  }, [storage]);

  const saveReminder = () => {
    if (remindersRef.current && reminderInfo) {
      reminderInfo.creationDate = new Date();
      reminderInfo.id = remindersRef.current.length;

      storage.setItem('reminders', [
        ...remindersRef.current,
        reminderInfo as Reminder,
      ]);

      navigator.goBack();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View
        style={
          colorScheme === 'light'
            ? styles.modalWhiteContainer
            : styles.modalDarkContainer
        }>
        <ThemedText type="subtitle">New Reminder</ThemedText>
        <TextInput
          placeholder="Reminder Title"
          style={styles.newReminderInput}
          maxLength={100}
          onChangeText={text => setReminderInfo({title: text})}
        />
        <Button title="Save" onPress={() => saveReminder()} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalWhiteContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    minWidth: 300,
  },
  modalDarkContainer: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    minWidth: 300,
  },
  newReminderInput: {
    fontSize: 16,
  },
});
