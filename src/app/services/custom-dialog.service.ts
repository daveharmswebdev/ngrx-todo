import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditTodoDialogComponent } from '../dialogs/edit-todo/edit-todo.component';
import { ITodo } from '../todo/state/todo.reducer';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CustomDialogService {

  constructor(public dialog: MatDialog) {}

  openEditDialog(todo: ITodo) {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '250px',
      data: { todo }
    });

    return dialogRef.afterClosed();
  }
}
