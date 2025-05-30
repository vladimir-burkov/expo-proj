import React, { createContext, useContext, ReactNode } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PracticeStat = {
  [key: string]: number
}

interface StorageContextType {
  setLSItem: <T>(key: string, value: T) => Promise<void>;
  getLSItem: <T>(key: string) => Promise<T | null>;
  removeLSItem: (key: string) => Promise<void>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

interface StorageProviderProps {
  children: ReactNode;
}

export const lsKeys = {
  LS_PRACTICE_KEY: 'GU_practice_stat'
}

export function getProgressColor(progress: number) {  
  if (progress > 0.9) {
    return '#28a745';
  } else if (progress > 0.4) {
    return '#ee9228';
  } else if (progress > 0) {
    return '#c62c2c'
  } else {
    return 'gray'
  }
}

export const StorageProvider: React.FC<StorageProviderProps> = ({ children }) => {
  
  const setLSItem = async <T,>(key: string, value: T): Promise<void> => {
    try {
      const serialized = JSON.stringify(value);
      if (Platform.OS === 'web') {
        localStorage.setItem(key, serialized);
      } else {
        await AsyncStorage.setItem(key, serialized);
      }
    } catch (e) {
      console.error('Storage setItem error:', e);
    }
  };

  const getLSItem = async <T,>(key: string): Promise<T | null> => {
    try {
      const rawValue =
        Platform.OS === 'web'
          ? localStorage.getItem(key)
          : await AsyncStorage.getItem(key);

      if (rawValue == null) return null;

      return JSON.parse(rawValue) as T;
    } catch (e) {
      console.error('Storage getItem error:', e);
      return null;
    }
  };

  const removeLSItem = async (key: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    } catch (e) {
      console.error('Storage removeItem error:', e);
    }
  };

  return (
    <StorageContext.Provider value={{ setLSItem, getLSItem, removeLSItem }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = (): StorageContextType => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};
