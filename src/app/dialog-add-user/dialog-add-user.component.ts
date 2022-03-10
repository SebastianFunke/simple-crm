import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
user = new User();
birthDate!: Date;
loading=false;
  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {
  }

saveUser(){
  this.loading=true;
  this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;

  this.firestore.collection('user')
  .add(this.user.toJson())
  .then((result:any) => {
    console.log('adding user finished, ', result, this.loading);
    this.loading=false;
    this.dialogRef.close();
  })
 
 
}


}
