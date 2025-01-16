import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ThemedText} from '../components/ThemedText';
import {ThemedView} from '../components/ThemedView';
import {useStorage} from '../hooks/storage';
import {Reminder} from '../types/reminder';
import {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useColorScheme} from '../hooks/theme/useColorScheme';

export default function DeleteReminderLayout({route}: any) {
  const navigator = useNavigation();
  const storage = useStorage();
  const searchParams = route.params;
  const [reminderInfo, setReminderInfo] = useState<
    Partial<Reminder> | undefined
  >();

  const colorScheme = useColorScheme();

  useEffect(() => {
    storage.getItem<Reminder[]>('reminders').then(reminders => {
      setReminderInfo(reminders.find(r => r.id === +searchParams.id));
    });
  }, [searchParams.id, storage]);

  const deleteReminder = () => {
    if (reminderInfo) {
      storage
        .getItem<Reminder[]>('reminders')
        .then(reminders => {
          storage.setItem(
            'reminders',
            reminders.filter(r => r.id !== reminderInfo.id),
          );
        })
        .then(() => navigator.goBack());
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
        <ThemedText type="subtitle">Delete Reminder</ThemedText>
        <ThemedText type="default">
          Are you sure you want to delete:
          <ThemedText type="defaultSemiBold">
            {' '}
            {reminderInfo?.title}?
          </ThemedText>
        </ThemedText>
        <View style={styles.modalButtons}>
          <Pressable onPress={() => navigator.goBack()}>
            <ThemedText type="link">Cancel</ThemedText>
          </Pressable>
          <Pressable onPress={() => deleteReminder()}>
            <ThemedText type="link">Delete</ThemedText>
          </Pressable>
        </View>
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
  },
  modalDarkContainer: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end',
  },
});
