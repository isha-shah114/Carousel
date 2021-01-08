import { Injectable } from '@angular/core';
import { Images } from './images-interface';
import { IMAGES } from './images-array';

@Injectable({
  providedIn: 'root'
})
export class AddSlideService {

  getData(): Images[] {
    return IMAGES;
  }

  updateUser(editUser)
  {
    let users:any =[];
    users = JSON.parse(localStorage.getItem('Users'));

    // if(editUser.empid == user[0].empid)
    // {
    //   userEdit.push(editUser);
    // }
  }
}
