// context/LessonContext.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { createContext, ReactNode, useContext, useState } from 'react';


export type VocabularyData = {
  [key: string]: {[key: string] : string}
}

// -----------------------
export type Lesson = {
  lessonid: string;
  title: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  article_url: string;
  vocabularyId: string;
  practiceConfig: IPracticeConfig;
};
export interface IPracticeConfig {
  vocabularId: string;
  inputIds: string[];
  testIds: string[];
  orderIds: string[];
}

// --------------------

export interface IPractice {
  practiceid: string;
  title: string;
  instruction?: string;
  tasks: (ITask | ITestTask)[];
};

export interface ITask {
  question: string;
  answer: string;
}
export interface ITestTask extends ITask{
  options: string[];
}

// ------------------------
export type Lessons = {
  [key: string]: Lesson;
};

export type PracticiesData = {
  [key: string]: IPractice;
};

type LessonContextType = {
  lessons: Lesson[];
  practicies: IPractice[];
  lessonsById: Lessons;
  practiciesById: PracticiesData;
  vocabulariesById: VocabularyData;
};

const initialVocabulary: VocabularyData = {
  voc1: {
    "αιώνας": "век",
    "λαιμός": "горло, шея",
    "αιχμή": "пик, острие",
    "παιδί": "ребенок",
    "δίαιτα": "диета",
    "καιρός": "погода",
    "πλαίσιο": "рама, рамка (контекст)",
    "αρχαίος": "древний",
    "ωραίος": "красивый, хороший",
    "μαχαίρι": "нож",
    "αίνιγμα": "загадка, головоломка",
    "αίμα": "кровь",
    "παίρνω": "брать",
    "βεβαίωση": "сертификат, подтверждение",
    "λάιμ": "лайм",
    "πλάι-πλάι": "бок о бок",
    "μαϊμού": "обезьяна",
    "λαϊκός": "народный",
    "γάϊδαρος": "осёл",
    "αϊκίντο": "айкидо",
    "παϊδάκια": "ребрышки",
    "αιτία": "причина",
    "αιφνίδιος": "внезапный",
    "αιμοδοσία": "донорство крови",
    "αίτηση": "заявление",
    "αισιοδοξία": "оптимизм"
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

const initialPracticies: PracticiesData = {
  ai: {
    practiceid: 'ai',
    title: "Тест для сочетаний αι, αί, άι, αΐ",
    instruction: "Выберете подходящую транскрипцию, проговаривая правильное произношение вслух",
    tasks: [
      {
        question: "αιώνας",
        answer: "эо́нас",
        options: ["айо́нас","эона́с","айона́с"]
      },
      {
        question: "λαιμός",
        answer: "лемо́с",
        options: ["лаймо́с","лимо́с","ла́ймос"]
      },
      {
        question: "αιχμή",
        answer: "эхми́",
        options: ["айхми́","а́ихми"]
      },
      {
        question: "παιδί",
        answer: "пэ[ð]и́",
        options: ["пайди́", "пай[ð]и́", "паи[ð]и́"]
      },
      {
        question: "δίαιτα",
        answer: "[ð]и́ета",
        options: ["[ð]иа́ита", "[ð]ие́та"]
      },
      {
        question: "καιρός",
        answer: "керо́с",
        options: ["кайро́с", "ка́йрос", "кэ́рос"]
      },
      {
        question: "αρχαίος",
        answer: "архе́ос",
        options: ["арха́йос", "а́рхеос", "архаё́с"]
      },
      {
        question: "ωραίος",
        answer: "орэ́ос",
        options: ["ора́йос","ораи́ос","ораё́с"]
      },
      {
        question: "μαχαίρι",
        answer: "махе́ри",
        options: ["махайри","махэри","маха́йри"]
      },
      {
        question: "αίνιγμα",
        answer: "э́нигма",
        options: ["эни́гма","аи́нигма","а́йнигма"]
      },
      {
        question: "αίμα",
        answer: "э́ма",
        options: ["айма","аи́ма"]
      },
      {
        question: "παίρνω",
        answer: "пэ́рно",
        options: [ "паи́рно","пэрно́"]
      },
      {
        question: "βεβαίωση",
        answer: "вэве́оси",
        options: ["вева́йоси","веваи́оси"]
      },
      {
        question: "λάιμ",
        answer: "ла́йм",
        options: ["лэ́йм","лаи́м"]
      },
      {
        question: "πλάι-πλάι",
        answer: "пла́й-пла́й",
        options: ["плэ́й-плэ́й","плаи́-плаи́"]
      },
      {
        question: "μαϊμού",
        answer: "майму́",
        options: ["ма́йму","мэму́","маи́му"]
      },
      {
        question: "λαϊκός",
        answer: "лайко́с",
        options: ["леко́с","лэ́кос"]
      },
      {
        question: "γάϊδαρος",
        answer: "га́й[ð]арос",
        options: ["ге́[ð]арос","гаи[ð]аро́с"]
      },
      {
        question: "αϊκίντο",
        answer: "айки́до",
        options: ["айки́нто","айкидо́"]
      },
      {
        question: "παϊδάκια",
        answer: "пай[ð]а́кия",
        options: ["пэ[ð]а́кия","пэ[ð]аки́я"]
      },
      {
        question: "αιτία",
        answer: "эти́я",
        options: ["аити́я","аитья"]
      },
      {
        question: "αιφνίδιος",
        answer: "эфни́[ð]иос",
        options: ["аифни́[ð]иос","эфни́[ð]ио́с"]
      },
      {
        question: "αιμοδοσία",
        answer: "эмо[ð]оси́а",
        options: ["эмо[ð]осья́","аимо[ð]осья́","аимо[ð]оси́а"]
      },
      {
        question: "αίτηση",
        answer: "э́тиси",
        options: ["аи́тиси","айтиси"]
      },
      {
        question: "αισιοδοξία",
        answer: "эсио[ð]окси́а",
        options: ["эсио[ð]оксья́","аисио[ð]окси́а","аисио[ð]оксья́"]
      }
    ]
  },
  thanksgivig: {
    practiceid: 'thanksgivig',
    title: "Благодарности",
    instruction: "Составьте перевод предложения из предложенных слов",
    tasks: [
      {
        question: "большое прибольшое спасибо",
        answer: "ευχαριστώ πάρα πολύ",
      }]
  }
}

const initialLessons: Lessons = {
  abc: {
    lessonid: 'abc',
    title: 'Алфавит. Правила чтения',
    icon: 'book',
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      testIds: ['ai'],
      orderIds: ['thanksgivig'],
      inputIds: [],
    }
  },
  noun: {
    lessonid: 'noun', 
    title: 'Существительные. Определенный Артикль', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc2',
    practiceConfig: {
      vocabularId: 'voc2',
      inputIds: [],
      testIds: ['ai'],
      orderIds: []
    }
  },
  pronoun1: {
    lessonid: 'pronoun1', 
    title: 'Личные местоимения', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      inputIds: [],
      testIds: [],
      orderIds: []
    }
  },
  eimai: {
    lessonid: 'eimai', 
    title: 'Личные местоимения. Глагол είμαι', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      inputIds: [],
      testIds: [],
      orderIds: []
    }
  },
  adjective: {
    lessonid: 'adjective', 
    title: 'Согласование прилагательных', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      inputIds: [],
      testIds: [],
      orderIds: []
    }
  },
  describe: {
    lessonid: 'describe', 
    title: 'Описание объектов', 
    icon: 'file-text-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      inputIds: [],
      testIds: [],
      orderIds: []
    }
  },
  numbers: {
    lessonid: 'numbers', 
    title: 'Числа и числительные', 
    icon: 'file-text-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      inputIds: [],
      testIds: [],
      orderIds: []
    }
  },
  about: {
    lessonid: 'about', 
    title: 'Рассказ о себе(после винит и эхо)', 
    icon: 'comments-o', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: '',
      inputIds: [],
      testIds: [],
      orderIds: []
    }

  },
  verd: {
    lessonid: 'verd', 
    title: 'Виды глаголов', 
    icon: 'book', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      inputIds: [],
      testIds: [],
      orderIds: []
    }
  },
  a8: {
    lessonid: 'a8', 
    title: 'Числа и числительные, Числа и числительные', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      inputIds: [],
      testIds: [],
      orderIds: []
    }
  },
  a9: {
    lessonid: 'a9', 
    title: 'Area on\nthe map', 
    article_url: 'https://raw.githubusercontent.com/vladimir-burkov/lang-gr-public/refs/heads/master/lesson1.md.enc',
    vocabularyId: 'voc1',
    practiceConfig: {
      vocabularId: 'voc1',
      inputIds: [],
      testIds: [],
      orderIds: []
    }
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
