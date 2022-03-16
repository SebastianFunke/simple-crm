import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { SnackBarService } from '../snack-bar.service';

interface Users {
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
  allUsersFire = [] as any[];
  allUsers = [] as any[];
  user: Users[] = [
    { value: '', viewValue: '' },
  ];
  task = new Task();

  constructor(private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddTaskComponent>, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.firestore
      .collection('user')
      .valueChanges({ idField: 'userID' })
      .subscribe((changes: any) => {
        this.allUsersFire = changes;
        console.log('add Task user fire: ', this.allUsersFire);
      });

  }

  saveTask() {

    if (this.task.header && this.dueDate && this.task.description){

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
  } else {
    this.snackBarService.openSnackBar('Please fill all requiered Fields')
} 

}

}
