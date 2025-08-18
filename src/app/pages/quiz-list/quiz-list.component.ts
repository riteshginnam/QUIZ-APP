import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { Route, Router, RouterModule } from '@angular/router';
import { QuizService } from '../../services/quiz.service';  

@Component({
  selector: 'app-quiz-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent implements OnInit{
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService,private router:Router) {}

  async ngOnInit(): Promise<void> {
    try {
      this.quizzes = await this.quizService.getQuizzes();
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    }
  }

  takeQuiz(index: number): void {
    this.router.navigate(['/quiz', index]);

}

}
