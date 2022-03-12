import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditBirthdayComponent } from '../dialog-edit-birthday/dialog-edit-birthday.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userID = '' as any;
  user: User = new User();
  birthdateCache!: Date;
  birthdate!: string;
  starsign!: string;
  gender!: boolean;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userID = paramMap.get('id');
      this.getUser();
      this.setGender();
    });
  }

  /**
   * loading the requested user by id
   */
  getUser() {
    this.firestore
      .collection('user')
      .doc(this.userID)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
        this.setGender();
        this.setStarsign();
      });
  }

  /**
   * calculates the star sign of the user
   */
  setStarsign() {
    this.birthdateCache = new Date(this.user.birthDate);
    this.birthdate =
      this.birthdateCache.getDate() +
      '.' +
      (this.birthdateCache.getMonth() + 1) +
      '.' +
      this.birthdateCache.getFullYear();
    this.starsign =
      'Star Sign: ' +
      this.getStarsign(
        this.birthdateCache.getMonth() + 1 + '' + this.birthdateCache.getDate()
      );
  }

  /**
   * sets the variable gender, to display the correct image
   */
  setGender() {
    if (this.user.gender == 'male') {
      this.gender = true;
    } else {
      this.gender = false;
    }
  }

  /**
   * calculates the star sign of the date
   * @param datum date - the birthdate of the user
   * @returns string - the star sign of the birthday
   */
  getStarsign(datum: any) {
    if (datum.length <= 2) {
      datum = datum.substr(0, 1) + '0' + datum.substr(1, 2);
    }
    if (datum >= 321 && datum <= 420) {
      return ' Aries';
    } else if (datum >= 421 && datum <= 520) {
      return ' Taurus';
    } else if (datum >= 521 && datum <= 621) {
      return ' Gemini';
    } else if (datum >= 622 && datum <= 722) {
      return ' Cancer';
    } else if (datum >= 723 && datum <= 823) {
      return ' Leo';
    } else if (datum >= 824 && datum <= 923) {
      return ' Virgo';
    } else if (datum >= 924 && datum <= 1023) {
      return ' Libra';
    } else if (datum >= 1024 && datum <= 1122) {
      return ' Scorpio';
    } else if (datum >= 1123 && datum <= 1221) {
      return ' Sagittarius';
    } else if (datum >= 1222 || datum <= 120) {
      return ' Capricorn';
    } else if (datum >= 121 && datum <= 219) {
      return ' Aquarius';
    } else if (datum >= 220 && datum <= 320) {
      return ' Pisces';
    } else {
      return '';
    }
  }

  /**
   * function to show edit user component
   */
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userID = this.userID;
  }

  /**
   * function to show edit address component
   */
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userID = this.userID;
  }

  /**
   * function to show edit birthdate component
   */
  editBirthday() {
    const dialog = this.dialog.open(DialogEditBirthdayComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userID = this.userID;
  }

  /**
   * function to show delete user component
   */
  deleteUser() {
    const dialog = this.dialog.open(DeleteUserComponent);
    dialog.componentInstance.user = new User(this.user.toJson());
    dialog.componentInstance.userID = this.userID;
  }
}
