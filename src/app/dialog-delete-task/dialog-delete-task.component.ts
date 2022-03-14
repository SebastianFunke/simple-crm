import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-dialog-delete-task',
  templateUrl: './dialog-delete-task.component.html',
  styleUrls: ['./dialog-delete-task.component.scss']
})
export class DialogDeleteTaskComponent implements OnInit {

  taskID!: string;
loading!: boolean;
  constructor(public dialogRef: MatDialogRef<DialogDeleteTaskComponent>,public dialog: MatDialog, private firestore: AngularFirestore, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }


deleteTask(){
  if (this.taskID) {
    this.loading=true;
    this.firestore
      .collection('tasks')
      .doc(this.taskID)
      .delete()
      .then((result: any) => {
        this.snackBarService.openSnackBar('Task Deleted');
        this.loading=false;
        this.dialogRef.close();
      });
  }

}

}
