import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
userID = '' as any;
user:User = new User();


  constructor(private route:ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.userID = paramMap.get('id');
      console.log('got id: ', this.userID);
      this.getUser();
    })
  }

getUser(){
  this.firestore.collection('user')
  .doc(this.userID)
  .valueChanges()
  .subscribe((user: any) => {
this.user=new User(user);
console.log('retrieved user: ', this.user);
  })
}

}
