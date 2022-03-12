import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-dialog-edit-birthday',
  templateUrl: './dialog-edit-birthday.component.html',
  styleUrls: ['./dialog-edit-birthday.component.scss'],
})
export class DialogEditBirthdayComponent implements OnInit {
  user: User = new User();
  birthDate!: Date;
  loading = false;
  userID!: string;
  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditBirthdayComponent>,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  /**
   * function to save changes of user data
   */
  saveUser() {
    if (!this.birthDate) {
      this.snackBarService.openSnackBar('Please enter Birthdate');
    } else {
      if (this.userID) {
        this.loading = true;
        this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
        this.firestore
          .collection('user')
          .doc(this.userID)
          .update(this.user.toJson())
          .then((result: any) => {
            this.loading = false;
            this.dialogRef.close();
          });
      }
    }
  }
}
