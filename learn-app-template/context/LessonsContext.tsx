// context/LessonContext.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Lesson = {
  id: string;
  title: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  article_url: string;
  vocabulary_url: string;
  practice: Practice[];
};

export type Practice = {
  id: string;
  title: string;
  url: string
};


export type Lessons = {
  [key: string]: Lesson;
};

type LessonContextType = {
  lessons: Lesson[];
  lessonsById: Lessons;
};

const initialLessons: Lesson[] = [
  {
    id: 'abc',
    title: 'Алфавит. Правила чтения',
    icon: 'book',
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: 'noun', 
    title: 'Существительные. Определенный Артикль', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: 'pronoun1', 
    title: 'Личные местоимения', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: 'eimai', 
    title: 'Личные местоимения. Глагол είμαι', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: 'adjective', 
    title: 'Согласование прилагательных', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: 'describe', 
    title: 'Описание объектов', 
    icon: 'file-text-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: 'numbers', 
    title: 'Числа и числительные', 
    icon: 'file-text-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: 'about', 
    title: 'Рассказ о себе(после винит и эхо)', 
    icon: 'comments-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: 'verd', 
    title: 'Виды глаголов', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: '8', 
    title: 'Числа и числительные, Числа и числительные', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
  {
    id: '9', 
    title: 'Area on\nthe map', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practice: [{
      id: 'test',
      title: "Practice",
      url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
    }]
  },
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
