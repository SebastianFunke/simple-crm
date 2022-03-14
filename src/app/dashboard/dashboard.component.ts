import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
allTasks = [] as any [];
  
  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private snackBarService: SnackBarService) {}


  ngOnInit(): void {
    this.firestore
    .collection('tasks')
    .valueChanges({ idField: 'taskID' })
    .subscribe((changes: any) => {
      this.allTasks = changes;
    });
    
  }

  deleteTask(taskID: any){
    console.log('delete Task: ', taskID);

    if (taskID) {
     
      this.firestore
        .collection('tasks')
        .doc(taskID)
        .delete()
        .then((result: any) => {
          this.snackBarService.openSnackBar('Task Deleted');
        });
    }

   }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {});
    dialogRef.afterClosed().subscribe((result) => {console.log('dashboard result: ',result)});
  }

}
