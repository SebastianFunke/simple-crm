import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { SnackBarService } from '../snack-bar.service';

interface Genders {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent implements OnInit {
  user: User = new User();
  birthDate!: Date;
  loading = false;
  userID!: string;
  genders: Genders[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  /**
   * function to save changes of user data
   */
  saveUser() {
    if (this.user.firstName && this.user.lastName && this.user.email) {
      if (this.userID) {
        this.loading = true;
        this.firestore
          .collection('user')
          .doc(this.userID)
          .update(this.user.toJson())
          .then((result: any) => {
            this.loading = false;
            this.dialogRef.close();
          });
      }
    } else {
      this.snackBarService.openSnackBar('Please fill all Fields');
    }
  }
}
