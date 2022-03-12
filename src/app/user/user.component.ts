import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: User = new User();
  allUsers = [] as any[];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore
      .collection('user')
      .valueChanges({ idField: 'userID' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  /**
   * function to open the dialog to add new user
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
