// context/LessonContext.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Lesson = {
  id: string;
  title: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  article_url: string;
  vocabulary_url: string;
  practiceIds: string[];
};

export type Practice = {
  id: string;
  title: string;
  url: string
};


export type Lessons = {
  [key: string]: Lesson;
};

export type Practicies = {
  [key: string]: Practice;
};

type LessonContextType = {
  lessons: Lesson[];
  practicies: Practice[];
  lessonsById: Lessons;
  practiciesById: Practicies;
};

const initialPracticies: Practicies = {
  abctest: {
    id: 'abctest',
    title: "Vocabulary",
    url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
  },
  nountest: {
    id: 'nountest',
    title: "Test",
    url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc'
  },

}

const initialLessons: Lessons = {
  abc: {
    id: 'abc',
    title: 'Алфавит. Правила чтения',
    icon: 'book',
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  noun: {
    id: 'noun', 
    title: 'Существительные. Определенный Артикль', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  pronoun1: {
    id: 'pronoun1', 
    title: 'Личные местоимения', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  eimai: {
    id: 'eimai', 
    title: 'Личные местоимения. Глагол είμαι', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  adjective: {
    id: 'adjective', 
    title: 'Согласование прилагательных', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  describe: {
    id: 'describe', 
    title: 'Описание объектов', 
    icon: 'file-text-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  numbers: {
    id: 'numbers', 
    title: 'Числа и числительные', 
    icon: 'file-text-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  about: {
    id: 'about', 
    title: 'Рассказ о себе(после винит и эхо)', 
    icon: 'comments-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']

  },
  verd: {
    id: 'verd', 
    title: 'Виды глаголов', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  a8: {
    id: 'a8', 
    title: 'Числа и числительные, Числа и числительные', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
  a9: {
    id: 'a9', 
    title: 'Area on\nthe map', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabulary_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    practiceIds: ['abctest', 'nountest']
  },
};


const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const [lessonsById] = useState(initialLessons);
  const [practiciesById] = useState(initialPracticies);
  const [lessons] = useState(Object.values(initialLessons));
  const [practicies] = useState(Object.values(initialPracticies));

  return (
    <LessonContext.Provider value={{ lessons, practicies, lessonsById, practiciesById }}>
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
