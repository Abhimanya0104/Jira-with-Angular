import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IssueStatus } from '@trungk18/interface/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { AuthQuery } from '@trungk18/project/auth/auth.query';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { BoardDndListComponent } from '../board-dnd-list/board-dnd-list.component';
import { AsyncPipe } from '@angular/common';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
@UntilDestroy()
@Component({
    selector: 'board-dnd',
    templateUrl: './board-dnd.component.html',
    styleUrls: ['./board-dnd.component.scss'],
    imports: [CdkDropListGroup, BoardDndListComponent, AsyncPipe]
})
export class BoardDndComponent implements OnInit {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  constructor(
    public projectQuery: ProjectQuery,
    public authQuery: AuthQuery,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    window.addEventListener('board-create-card', (event: any) => {
      const card = event.detail;

      // Create/update the issue in the project store so the board updates
      if (card) {
        this.projectService.updateIssue(card);
      }
    });
  }
}
