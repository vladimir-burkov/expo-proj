// context/LessonContext.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Lesson = {
  id: string;
  title: string;
  icon?: keyof typeof FontAwesome.glyphMap;
};

export type Lessons = {
  [key: string]: Lesson;
};

type LessonContextType = {
  lessons: Lesson[];
  lessonsById: Lessons;
};

const initialLessons: Lesson[] = [
  { id: '1', title: 'Алфавит. Правила чтения', icon: 'book' },
  { id: '2', title: 'Базовый диалог. Приветствие', icon: 'comments-o' },
  { id: '3', title: 'Глагол είμαι. Определенный артикль', icon: 'book' },
  { id: '4', title: 'Описание объектов', icon: 'comments-o' },
  { id: '4', title: 'Числа и числительные', icon: 'comments-o' },
  { id: '5', title: 'Рассказ о себе', icon: 'comments-o' },
  { id: '6', title: 'Виды глаголов', icon: 'book' },
  { id: '7', title: 'Area on\nthe map' },
  { id: '8', title: 'Area on\nthe map' },
  { id: '39', title: 'Area on\nthe map' },
  { id: '11', title: 'Area on\nthe map' },
  { id: '12', title: 'Area on\nthe map' },
  { id: '13', title: 'Area on\nthe map' },
  { id: '14', title: 'Area on\nthe map' },
  { id: '15', title: 'Area on\nthe map' },
  { id: '16', title: 'Area on\nthe map' },
];

const mapLessonsById = (lessons: Lesson[]): Lessons =>
  lessons.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Lessons);

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const [lessons] = useState(initialLessons);
  const [lessonsById] = useState(() => mapLessonsById(initialLessons));

  return (
    <LessonContext.Provider value={{ lessons, lessonsById }}>
      {children}
    </LessonContext.Provider>
  );
};

export const useLessons = (): LessonContextType => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLessons must be used within a LessonProvider');
  }
  return context;
};
