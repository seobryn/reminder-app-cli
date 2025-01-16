import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {ReminderItem} from '../ReminderItem';
import {Reminder} from '../../types/reminder';

describe('ReminderItem', () => {
  const mockOnCheck = jest.fn();
  const mockOnLongPress = jest.fn();

  const item: Reminder = {
    id: 1,
    completed: false,
    title: 'Test Reminder',
    creationDate: new Date(),
  };

  it('renders correctly', () => {
    const {getByText} = render(
      <ReminderItem
        item={item}
        selected={false}
        onCheck={mockOnCheck}
        onLongPress={mockOnLongPress}
      />,
    );

    expect(getByText('Test Reminder')).toBeTruthy();
    expect(getByText(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/)).toBeTruthy();
  });

  it('calls onCheck when checkbox is pressed', () => {
    const {getByTestId} = render(
      <ReminderItem
        item={item}
        selected={false}
        onCheck={mockOnCheck}
        onLongPress={mockOnLongPress}
      />,
    );

    act(() => {
      fireEvent(getByTestId('checkbox'), 'press');
    });
    expect(mockOnCheck).toHaveBeenCalledTimes(1);
  });

  it('calls onLongPress when the item is long-pressed', () => {
    const {getByText} = render(
      <ReminderItem
        item={item}
        selected={false}
        onCheck={mockOnCheck}
        onLongPress={mockOnLongPress}
      />,
    );

    act(() => {
      fireEvent(getByText('Test Reminder'), 'longPress');
    });
    expect(mockOnLongPress).toHaveBeenCalledTimes(1);
  });
});
