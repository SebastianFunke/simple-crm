import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Router } from '@angular/router';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  user = new User();
  userID!: string;
  loading = false;
  inputName!: string;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  deleteUser() {
    if (this.inputName == this.user.firstName) {
      if (this.userID) {
        this.loading = true;
        this.firestore
          .collection('user')
          .doc(this.userID)
          .delete()
          .then((result: any) => {
            this.loading = false;
            this.dialogRef.close();
            this.router.navigate(['../user']);
            this.showSnackbar('User deleted');
          });
      }
    } else {
      this.showSnackbar('Unable to delete without First Name is entered');
    }
  }


  showSnackbar(message: any){
    this.snackBarService.openSnackBar(message);
  }
}
