import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ITodo } from 'src/app/todo/state/todo.reducer';

export interface EditData {
  todo: ITodo;
}

export interface ITodoEditSubmission {
  edit: boolean;
  submission: Partial<ITodo>;
}

@Component({
  selector: 'app-edit-todo',
  templateUrl: 'edit-todo.component.html',
  styleUrls: ['edit-todo.component.scss']
})
export class EditTodoDialogComponent implements OnInit {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditData,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.editForm = this.fb.group({
      description: this.data.todo.description,
      owner: this.data.todo.owner
    });
  }

  submitEdit() {
    const submission: ITodoEditSubmission = {
      edit: true,
      submission: {
        id: this.data.todo.id,
        description: this.editForm.get('description').value,
        owner: this.editForm.get('owner').value
      }
    }
    this.dialogRef.close(submission);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
