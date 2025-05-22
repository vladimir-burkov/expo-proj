// context/LessonContext.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Lesson = {
  id: string;
  title: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  article_url: string;
  vocabularyId: string;
  practiceIds: string[];
};

export type Practice = {
  id: string;
  title: string;
  url: string;
  type: "vocabulary" | "input" | "order" | "test";
  tasksTmp?: Task[];
};

export type Vocabulary = {
  [key: string]: {[key: string] : string}
}


export type Task = {
  id: string;
  question: string;
  answer: string; 
}

export type MatchTask = {
  id: string;
  question: string;
  answer: string; 
}


export type TestTask = {
  id: string;
  question: string;
  options: string[];
  answer: string; 
}


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
  vocabulariesById: Vocabulary;
};

const initialVocabulary: Vocabulary = {
  voc1: {
    "γιορτή": "праздник",
    "παιδική χαρά": "детская площадка",
    "αιώνας": "век",
    "αιχμάλωτος": "военнопленный",
    "αισθητική": "эстетика",
    "αιθανόλη": "этанол",
    "λαιμός": "горло, шея",
    "αιχμή": "пик, острие",
    "παιδί": "ребенок",
    "καινούργιος": "новый",
    "δίαιτα": "диета",
    "καιρός": "погода",
    "πλαίσιο": "рама, рамка (контекст)",
    "αρχαίος": "древний",
    "ωραίος": "красивый, хороший",
    "μαχαίρι": "нож",
    "αίνιγμα": "загадка, головоломка",
    "αίμα": "кровь",
    "παίρνω": "брать",
    "αίσθημα": "чувство, ощущение",
    "μαινόμενος": "яростный",
    "μαία": "акушерка",
    "καίω": "гореть, жечь",
    "βεβαίωση": "сертификат, подтверждение",
    "τσάι": "чай",
    "μάιος": "май",
    "λάιμ": "лайм",
    "πλάι-πλάι": "бок о бок",
  },
  voc2: {
    "αγγελτήριο": "приглашение",
    "εγγύηση": "гарантия",
    "εγγόνι": "внук",
    "συγγραφέας": "писатель",
    "συγγνώμη": "извинение",
    "συγγενής": "родственник",
    "συγκέντρωση": "собрание, концентрация",
    "άγκυρα": "якорь",
    "αγκαλιάζω": "обнимать",
    "άγχος": "стресс",
    "εγχείρηση": "операция",
    "εγχειρίδιο": "руководство, пособие",
    "έγχρωμος": "цветной",
    "έγχυση": "инъекция",
    "αγχώνω": "волновать",
    "εγχειριστής": "хирург"
  },
}

const initialPracticies: Practicies = {
  abctest: {
    id: 'abctest',
    title: "Vocabulary",
    url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    type: "vocabulary"
  },
  nountest: {
    id: 'nountest',
    title: "Test",
    url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    type: "input",
    tasksTmp: [
      {
        id: "1",
        question: "string",
        answer: "string",
      }
    ]
  },
}

const initialLessons: Lessons = {
  abc: {
    id: 'abc',
    title: 'Алфавит. Правила чтения',
    icon: 'book',
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
  noun: {
    id: 'noun', 
    title: 'Существительные. Определенный Артикль', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc2',
    practiceIds: ['abctest', 'nountest']
  },
  pronoun1: {
    id: 'pronoun1', 
    title: 'Личные местоимения', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
  eimai: {
    id: 'eimai', 
    title: 'Личные местоимения. Глагол είμαι', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
  adjective: {
    id: 'adjective', 
    title: 'Согласование прилагательных', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
  describe: {
    id: 'describe', 
    title: 'Описание объектов', 
    icon: 'file-text-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
  numbers: {
    id: 'numbers', 
    title: 'Числа и числительные', 
    icon: 'file-text-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
  about: {
    id: 'about', 
    title: 'Рассказ о себе(после винит и эхо)', 
    icon: 'comments-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']

  },
  verd: {
    id: 'verd', 
    title: 'Виды глаголов', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
  a8: {
    id: 'a8', 
    title: 'Числа и числительные, Числа и числительные', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
  a9: {
    id: 'a9', 
    title: 'Area on\nthe map', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceIds: ['abctest', 'nountest']
  },
};


const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const [lessonsById] = useState(initialLessons);
  const [practiciesById] = useState(initialPracticies);
  const [vocabulariesById] = useState(initialVocabulary);
  const [lessons] = useState(Object.values(initialLessons));
  const [practicies] = useState(Object.values(initialPracticies));


  return (
    <LessonContext.Provider value={{ lessons, practicies, lessonsById, practiciesById, vocabulariesById }}>
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
