import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { SnackBarService } from '../snack-bar.service';
interface Genders {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate!: Date;
  loading = false;
  genders: Genders[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  /**
   * function to save the new user
   */
  saveUser() {

  if(this.user.firstName && this.user.lastName && this.birthDate && this.user.gender && this.user.email && this.user.street && this.user.zipCode && this.user.city){



    this.loading = true;
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    this.firestore
      .collection('user')
      .add(this.user.toJson())
      .then((result: any) => {
        this.loading = false;
        this.dialogRef.close();
      });
  }else {
  this.snackBarService.openSnackBar('Please Fill all requiered Fields');
  }
} 
}
