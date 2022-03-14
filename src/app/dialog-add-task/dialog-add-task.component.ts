import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';

interface Genders {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {
  loading = false;
  dueDate!: any;
  genders: Genders[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];
  task = new Task();

  constructor(private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddTaskComponent>) { }

  ngOnInit(): void {
  }

  saveTask() {
    this.loading = true;
    this.task.dueDate = this.dueDate ? this.dueDate.getTime() : 0;
    this.firestore
      .collection('tasks')
      .add(this.task.toJson())
      .then((result: any) => {
        this.loading = false;
        console.log('saveTask: ', this.task.toJson());
        this.dialogRef.close();
      });
  }

}
