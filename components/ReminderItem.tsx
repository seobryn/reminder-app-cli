import React from 'react';
import {ThemedText} from './ThemedText';
import {Reminder} from '../types/reminder';
import {Pressable, StyleSheet, useColorScheme, View} from 'react-native';
import {format} from 'date-fns';
import Checkbox from 'react-native-bouncy-checkbox';

export function ReminderItem({
  item,
  selected,
  onCheck,
  onLongPress,
}: {
  item: Reminder;
  selected: boolean;
  onCheck: (selected: boolean) => void;
  onLongPress: () => void;
}) {
  const colorScheme = useColorScheme();
  return (
    <Pressable
      key={item.title.replace(/\s+/g, '_')}
      style={
        colorScheme === 'light'
          ? styles.reminderContainer
          : styles.reminderContainerDark
      }
      onLongPress={onLongPress}>
      <Checkbox
        size={24}
        disableText
        useBuiltInState={false}
        fillColor="teal"
        isChecked={selected}
        onPress={onCheck}
      />
      <View style={styles.infoContainer}>
        <ThemedText type="subtitle">{item.title}</ThemedText>
        <ThemedText type="defaultSemiBold">
          {format(item.creationDate, 'dd/MM/yyyy HH:mm')}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  reminderContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  reminderContainerDark: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#333',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
});
