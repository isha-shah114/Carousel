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
}