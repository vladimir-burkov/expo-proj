// context/LessonContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Lesson = {
  id: string;
  title: string;
  icon?: string;
};

export type Lessons = {
  [key: string]: Lesson;
};

type LessonContextType = {
  lessons: Lesson[];
  lessonsById: Lessons;
};

const initialLessons: Lesson[] = [
  { id: '1', title: 'Area on\nthe map', icon: 'book' },
  { id: '2', title: 'Area on\nthe map', icon: 'comments-o' },
  { id: '3', title: 'Area on\nthe map' },
  { id: '4', title: 'Area on\nthe map' },
  { id: '5', title: 'Area on\nthe map' },
  { id: '6', title: 'Area on\nthe map' },
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
