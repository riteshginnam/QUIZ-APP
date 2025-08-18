import { Injectable } from '@angular/core';
import { History } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: History[] = [];

  constructor() {
    this.loadHistoryFromLocalStorage();
  }

  private getHistoryFromLocalStorage(): string | null {
    return localStorage.getItem('quizHistory');
  }

  private parseHistoryData(historyData: string): History[] {
    return JSON.parse(historyData) as History[];
  }

  private ensureDatesAreParsed(): void {
    this.history.forEach((entry) => {
      if (entry.date && !(entry.date instanceof Date)) {
        entry.date = new Date(entry.date);
      }
    });
  }

  private loadHistoryFromLocalStorage(): void {
    const historyData = this.getHistoryFromLocalStorage();

    if (!historyData) return;
    try {
      this.history = this.parseHistoryData(historyData);
      this.ensureDatesAreParsed();
    } catch (error) {
      console.error('Error parsing history from localStorage', error);
      this.history = [];
    }
  }

  private saveHistoryToLocalStorage(): void {
    try {
      localStorage.setItem('quizHistory', JSON.stringify(this.history));
    } catch (error) {
      console.error('Error saving history to localStorage', error);
    }
  }

  addHistoryEntry(quizTitle: string, score: number, maxScore: number): void {
    const newHistory = new History(quizTitle, score, new Date(), maxScore);
    this.history.push(newHistory);
    this.saveHistoryToLocalStorage();
    console.log('History entry added:', newHistory);
  }

  getHistory(): History[] {
    return this.history
      .slice()
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}