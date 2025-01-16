import AsyncStorage from '@react-native-async-storage/async-storage';
export function useStorage() {
  return {
    getItem: async <T>(key: string): Promise<T> => {
      const value = JSON.parse((await AsyncStorage.getItem(key)) || '[]');
      return value as T;
    },
    setItem: async <T>(key: string, value: T): Promise<boolean> => {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    },
  };
}
