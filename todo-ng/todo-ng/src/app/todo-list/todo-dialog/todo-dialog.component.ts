import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css']
})
export class TodoDialogComponent {

  constructor(private dialogRef:MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo) { }

  onCloseConfirm() {
    this.dialogRef.close(this.data.content);
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
}