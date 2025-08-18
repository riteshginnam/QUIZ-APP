import { Routes } from '@angular/router';
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
  { path: '', component: QuizListComponent },
  { path: 'quiz/:index', component: QuizComponent },
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'history', component: HistoryComponent },
]