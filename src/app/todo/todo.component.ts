import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { AddTodo, ToggleDone, MarkAllAsComplete, DeleteTodo, UpdateDescription } from './state/todo.actions';
import { Observable } from 'rxjs';
import { ITodo } from './state/todo.reducer';
import { selectTodos } from './state/todo.selectors';
import { take } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { CustomDialogService } from '../services/custom-dialog.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todoForm: FormGroup;
  public todos$: Observable<ITodo[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private dialogService: CustomDialogService
  ) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      description: '',
      owner: '',
      complete: false
    });

    this.todos$ = this.store.pipe(select(selectTodos));
  }

  addTodo() {
    console.log('adding todo', this.todoForm.value);
    const todo = this.todoForm.value;
    this.store.dispatch(new AddTodo({ todo }));
    this.todoForm.reset({
      description: '',
      owner: '',
      complete: false
    });
  }

  toggleComplete(todo: ITodo) {
    const todoUpdate: Update<ITodo> = {
      id: todo.id,
      changes: { complete: !todo.complete }
    };
    this.store.dispatch(new ToggleDone(todoUpdate));
  }

  removeTodo(todo: ITodo) {
    this.store.dispatch(new DeleteTodo({id: todo.id}));
  }

  edit(todo) {
    console.log('edit', todo);
    this.dialogService.openEditDialog(todo).subscribe(
      submission => {
        console.log(submission);
        if (typeof submission !== 'undefined' && submission.edit) {
          console.log('we can edit');
          this.store.dispatch(new UpdateDescription({id: submission.submission.id, newDescription: submission.submission.description}))
        } else {
          console.log('there was no edit');
        }
      }
    );
  }

  markAllAsComplete() {
    this.todos$.pipe(take(1)).subscribe(todos => {
      const todoUpdates: Update<ITodo>[] = todos.map(todo => {
        return {
          id: todo.id,
          changes: {
            complete: true
          }
         };
      });
      console.log(todoUpdates);
      this.store.dispatch(new MarkAllAsComplete(todoUpdates));
    });
  }
}
