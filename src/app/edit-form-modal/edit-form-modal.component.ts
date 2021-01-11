import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Images } from '../images-interface';
import { AddSlideService } from '../add-slide.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-form-modal',
  templateUrl: './edit-form-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit-form-modal.component.scss']
})
export class EditFormModalComponent implements OnInit {
  editForm: FormGroup; //to store the value of form
  formValue: any = []; //to store the value of dynamic form
  images: Images[]; // to store images array into variable
  imageUrl: any;
  members: any = [];
  editUser: [];
  trustedUrl: SafeUrl;

  constructor(private formBuilder: FormBuilder, 
              private _NgbActiveModal: NgbActiveModal,
              private addService: AddSlideService,
              private domSanitizer: DomSanitizer) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit(): void {
    // storing and declaring the fields of form
    this.editForm = this.formBuilder.group({
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
    this.imageUrl = this.images[0].url;
    this.trustedUrl = this.domSanitizer.bypassSecurityTrustUrl(this.imageUrl);
    if(event.target.files) { 
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.imageUrl = e.target.result;
        
      }
     
    }
    console.log(this.imageUrl);
  }

  update(e) {
    this.editUser = this.members.filter(item => item.empid == e);
    alert('Updated');
    this.editUser = this.editForm.value;

    console.log(this.editUser);
   
  }
}