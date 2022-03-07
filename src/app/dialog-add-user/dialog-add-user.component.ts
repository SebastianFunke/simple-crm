import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
user = new User();
birthDate!: Date;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

saveUser(){
  this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;

  this.firestore.collection('user')
  .add(this.user.toJson())
  .then((result:any) => {
    console.log('adding user finished, ', result);
    
  })
 
 
}
}
