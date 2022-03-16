import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { DialogDeleteTaskComponent } from '../dialog-delete-task/dialog-delete-task.component';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
allTasks = [] as any [];
dueDate!: Date;
  
  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private snackBarService: SnackBarService) {}


  ngOnInit(): void {
    this.firestore
    .collection('tasks')
    .valueChanges({ idField: 'taskID' })
    .subscribe((changes: any) => {
      this.allTasks = changes;
      this.allTasks.forEach(element =>{
        this.dueDate = new Date(element.dueDate);
        element.dueDate ='Due Date: ' + this.dueDate.getDate()+'.'+ (this.dueDate.getMonth()+1) +'.'+ this.dueDate.getFullYear();
      })
    });
  }

  /**
   * opens the dialog to delete a specific task
   * @param taskID number - Id of the Task
   */
  openDialogDelete(taskID: any){
    const dialog = this.dialog.open(DialogDeleteTaskComponent);
    dialog.componentInstance.taskID = taskID;
   }

   /**
    * opens dialog to add new task
    */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {});
    dialogRef.afterClosed().subscribe((result) => {console.log('dashboard result: ',result)});
  }
}
