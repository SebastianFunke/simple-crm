import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent implements OnInit {
  user: User = new User();
  loading = false;
  userID!: string;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  saveUser() {
    if(this.user.street && this.user.zipCode && this.user.city){

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

   
    }
 else {

  this.snackBarService.openSnackBar('Please fill all Fields');
}
  }
}
