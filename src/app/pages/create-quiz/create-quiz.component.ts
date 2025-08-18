import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-create-quiz',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss',
})
export class CreateQuizComponent {
  quizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([this.createOption()]),
    });
  }

  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false],
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
    console.log(`Question added. Total questions: ${this.questions.length}`);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.createOption());
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  onSubmit(): void {
    if (!this.quizForm.valid) {
      console.error('Form is not valid');
    }
    const newQuiz: Quiz = this.quizForm.value;
    this.quizService.addQuiz(newQuiz);
    this.router.navigate(['/']);
  }
}