import { useNavigation } from 'expo-router';
import React, { createContext, useContext } from 'react';
import { useLessons } from './LessonsContext';

type HeaderContextType = {
  setHeaderTitle: (title: string) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeader = () => {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw new Error('useHeader must be used inside HeaderProvider');
  return ctx;
};

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = useNavigation();
  const { lessonsById } = useLessons();


  const setHeaderTitle = (lessonId: string) => {
    const {title} = lessonsById[lessonId as string];

    navigation.setOptions({
      title,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A90E2',
      },
    });
  };

  return (
    <HeaderContext.Provider value={{ setHeaderTitle }}>
      {children}
    </HeaderContext.Provider>
  );
};
