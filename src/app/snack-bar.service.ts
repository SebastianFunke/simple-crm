import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { 

  }

  openSnackBar(message: any) {
    
    this._snackBar.open(message,'',{
      duration: 1500,
    });
  }
}
