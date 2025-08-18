import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { Score } from '../models/score.model';
import { firstValueFrom, map } from 'rxjs';

const QUIZZ_FILE_PATH = 'quizzes.json';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizzes: Quiz[] = [];
  private score = new Score();
  private quizzesLoaded: Promise<void>;

  constructor(public http: HttpClient) {
    this.quizzesLoaded = this.loadQuizzesFromJson(QUIZZ_FILE_PATH);
  }

  private loadQuizzesFromJson(jsonPath: string): Promise<void> {
    return firstValueFrom(
      this.http.get<Quiz[]>(jsonPath).pipe(
        map((quizzes) => {
          this.quizzes = quizzes.map(
            (quiz) => new Quiz(quiz.title, quiz.questions)
          );
        })
      )
    )
      .then(() => {
        console.log('Quizzes loaded successfully');
      })
      .catch((error) => {
        console.log('Failed to load quizzes ', error);
      });
  }

  async getQuiz(index: number): Promise<Quiz> {
    await this.quizzesLoaded;
    return this.quizzes[index];
  }

  async getQuizzes(): Promise<Quiz[]> {
    await this.quizzesLoaded;
    return this.quizzes;
  }

  addQuiz(newQuiz: Quiz): void {
    this.quizzes.push(newQuiz);
  }

  getScore(): Score {
    return this.score;
  }

  incrementScore(): void {
    this.score.incrementCorrect();
  }

  resetScore(): void {
    this.score = new Score();
  }
}