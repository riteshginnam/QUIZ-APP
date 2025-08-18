import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { HistoryService } from '../../services/history.service';
import { History } from '../../models/history.model';

@Component({
  selector: 'app-history',
  imports: [CommonModule, CustomDatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  history: History[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.history = this.historyService.getHistory();
  }
}
