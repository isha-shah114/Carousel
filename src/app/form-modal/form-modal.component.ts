import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Images } from '../images-interface';
import { AddSlideService } from '../add-slide.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  sliderForm: FormGroup; //to store the value of form
  formValue: any = []; //to store the value of dynamic form
  images: Images[]; // to store images array into variable
  imageUrl: any;

  constructor(private formBuilder: FormBuilder, 
              private _NgbActiveModal: NgbActiveModal,
              private addService: AddSlideService) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit(): void {
    // storing and declaring the fields of form
    this.sliderForm = this.formBuilder.group({
      no: [''],
      myfile: [''],
      desc: [''],
    });
    this.getData();
  }
  getData(): void {
    this.images = this.addService.getData(); // calling getData method from addservice page to add and 
                                            //store data into images variable
  }

  onFileSelected(event) {
    if(event.target.files) { 
      var reader = new FileReader(); //to convert path into safe path
      event.target.files instanceof FileList
              ? reader.readAsDataURL(event.target.files[0]) : 'handle exception'
      reader.onload=(e:any)=>{
        this.imageUrl = e.target.result;
        console.log(this.imageUrl);
      }
    }
  }

  onSubmit() { 
    // storing the value of dynamic form in array
    this.formValue = this.sliderForm.value;
    //to values getting added in an array through user input
    this.images.push({
      id: this.formValue.no,
      url: this.imageUrl,
      caption: this.formValue.desc,
    });
    alert('Data added successfully');
    this.sliderForm.reset(); //resetting form after getting submitted
  }
}