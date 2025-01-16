import React from 'react';
import {render} from '@testing-library/react-native';
import Reminders from '../index';
import {useStorage} from '../../hooks/storage';
import {useColorScheme} from '../../hooks/theme/useColorScheme';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('../../hooks/storage', () => ({
  useStorage: jest.fn(),
}));

jest.mock('../../hooks/theme/useColorScheme', () => ({
  useColorScheme: jest.fn(),
}));

const MockedNavigation = ({children}: any) => (
  <NavigationContainer>{children}</NavigationContainer>
);

describe('Reminders Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with no reminders', () => {
    (useStorage as jest.Mock).mockReturnValue({
      getItem: jest.fn().mockResolvedValue([]),
      setItem: jest.fn(),
    });
    (useColorScheme as jest.Mock).mockReturnValue('light');

    const {getByText} = render(
      <MockedNavigation>
        <Reminders />
      </MockedNavigation>,
    );

    expect(getByText('No reminders found')).toBeTruthy();
    expect(getByText('Tap new to add one')).toBeTruthy();
  });

  it('renders correctly with reminders', async () => {
    const mockReminders = [
      {
        id: 1,
        title: 'Reminder 1',
        completed: false,
        creationDate: new Date('2024-01-02'),
      },
      {
        id: 2,
        title: 'Reminder 2',
        completed: false,
        creationDate: new Date('2024-01-01'),
      },
    ];
    (useStorage as jest.Mock).mockReturnValue({
      getItem: jest.fn().mockResolvedValue(mockReminders),
      setItem: jest.fn(),
    });
    (useColorScheme as jest.Mock).mockReturnValue('light');

    const {findByText} = render(
      <MockedNavigation>
        <Reminders />
      </MockedNavigation>,
    );

    expect(await findByText('Reminder 1')).toBeTruthy();
    expect(await findByText('Reminder 2')).toBeTruthy();
  });
});
