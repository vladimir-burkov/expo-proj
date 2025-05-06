import React from 'react';
import MainPageList from '@/components/MainPageList';
import { LessonProvider } from '@/context/LessonsContext';

export default function Index() {

  return (
    <LessonProvider>
      <MainPageList/>
    </LessonProvider>
  );
}
