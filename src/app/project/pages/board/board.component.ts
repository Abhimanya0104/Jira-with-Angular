import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardDndComponent } from '../../components/board/board-dnd/board-dnd.component';
import { BoardFilterComponent } from '../../components/board/board-filter/board-filter.component';
import { BreadcrumbsComponent } from '../../../jira-control/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, BoardFilterComponent, BoardDndComponent, FormsModule]
})
export class BoardComponent {

  breadcrumbs: string[] = ['Projects', 'Angular Jira Clone', 'Kanban Board'];

  // UI state
  newCardOpen = false;
  statsOpen = false;

  // New card model
  newCard = {
    title: '',
    description: '',
    status: 'backlog'
  };

  // Workspace stats (mock for now)
  stats = {
    total: 12,
    progress: 5,
    done: 4,
    backlog: 3
  };

  createCard() {
    if (!this.newCard.title?.trim()) return;

    const createdCard = {
      id: Date.now(),
      title: this.newCard.title,
      description: this.newCard.description,
      status: this.newCard.status
    };

    // Emit lightweight global event so board-dnd can place the card in correct column
    window.dispatchEvent(
      new CustomEvent('board-create-card', { detail: createdCard })
    );

    this.stats.total += 1;

    if (createdCard.status === 'progress') {
      this.stats.progress += 1;
    } else if (createdCard.status === 'done') {
      this.stats.done += 1;
    } else {
      this.stats.backlog += 1;
    }

    this.newCard = {
      title: '',
      description: '',
      status: 'backlog'
    };

    this.newCardOpen = false;
  }

}