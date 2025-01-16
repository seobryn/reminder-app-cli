/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Link, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Reminders from './screens';
import DeleteReminderLayout from './screens/deleteReminder';
import AddReminderLayout from './screens/newReminder';
import {ThemedText} from './components/ThemedText';
import {useColorScheme} from './hooks/theme/useColorScheme';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={Reminders}
          options={{
            title: 'Reminders',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colorScheme === 'light' ? 'black' : 'white',
            },
            headerStyle: {
              backgroundColor: colorScheme === 'light' ? 'white' : '#333',
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => {
              return (
                <Link
                  screen="newReminder"
                  children={<ThemedText type="defaultSemiBold">Add</ThemedText>}
                />
              );
            },
          }}
        />
        <Stack.Screen
          name="deleteReminder"
          component={DeleteReminderLayout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="newReminder"
          component={AddReminderLayout}
          options={{headerShown: false, animation: 'fade'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
