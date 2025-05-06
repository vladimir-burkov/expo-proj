// context/LessonContext.js
import React, { createContext, useState, useContext, ReactNode } from 'react';


type Lesson = {
  id: string;
  title: string;
};

const initialLessons = [
  { id: '1', title: 'Area on\nthe map' },
  { id: '2', title: 'Area on\nthe map' },
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

const LessonsContext = createContext<Lesson[]>([]);

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const [lessons] = useState(initialLessons);

  return (
    <LessonsContext.Provider value={lessons}>
      {children}
    </LessonsContext.Provider>
  );
};

export const useLessons = () => useContext(LessonsContext);
