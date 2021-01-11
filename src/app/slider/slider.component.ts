import { Component, OnInit, VERSION } from '@angular/core';
import { NgbModal, NgbCarouselConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Images } from '../images-interface';
import { AddSlideService } from '../add-slide.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})

export class SliderComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  editForm: FormGroup; //to store the value of form
  formValue: any = []; //to store the value of dynamic form
  images: Images[]; // to store images array into variable
  members: any = [];
  editUser: any = [];
  selectedRow;
  imageUrl: any;
  trustedUrl: SafeUrl;

  constructor(config: NgbCarouselConfig, 
              private formBuilder: FormBuilder, 
              private _NgbModal: NgbModal, 
              private _NgbActiveModal: NgbActiveModal,
              private addService: AddSlideService,
              private domSanitizer: DomSanitizer) {
                
    // customize default values of carousels used by this component tree
    config.interval = 4000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  ngOnInit(): void {
    // storing and declaring the fields of form
    this.editForm = this.formBuilder.group({
      id: [''],
      url: [''],
      caption: [''],
    });
    this.getData();
  }
  getData(): void {
    this.images = this.addService.getData(); // calling getData method from addservice page to add and 
                                             //store data into images variable
  }

  deleteImage(image) {
    this.images.splice(image, 1); //delete data from existing array
  }
  
  openForm() {
    //opening form into modal
      this._NgbModal.open(FormModalComponent, {
        windowClass: 'modal-job-scrollable'
      });

      // upwrap the "app-ng-modal" data to enable the "modal-dialog-scrollable"
    // and make the modal scrollable
    (() => {
      const node: HTMLElement | null = document.querySelector('app-form-modal');
      if (node) {
        while (node.firstChild) {
          (node.parentNode as HTMLElement).insertBefore(node.firstChild, node);
        }
      }
      // make the modal scrollable by adding the class .modal-dialog-scrollable
      // here wait for one second so that we can find the .modal-dialog
      setTimeout(() => {
        const modalDialog = document.querySelector('.modal-job-scrollable .modal-dialog');
        if (modalDialog) {
          modalDialog.classList.add('modal-dialog-scrollable');
        }
      },)
    })();
  } 
  
  openEditForm(targetModal, user) {
    //opening form into modal
    const modalRef = this._NgbModal.open(targetModal, {
        windowClass: 'modal-job-scrollable'
      });
      this.selectedRow = {id:user.id, url:user.url, caption: user.caption};

      // upwrap the "app-ng-modal" data to enable the "modal-dialog-scrollable"
    // and make the modal scrollable
    (() => {
      const node: HTMLElement | null = document.querySelector('targetModal');
      if (node) {
        while (node.firstChild) {
          (node.parentNode as HTMLElement).insertBefore(node.firstChild, node);
        }
      }
      // make the modal scrollable by adding the class .modal-dialog-scrollable
      // here wait for one second so that we can find the .modal-dialog
      setTimeout(() => {
        const modalDialog = document.querySelector('.modal-job-scrollable .modal-dialog');
        if (modalDialog) {
          modalDialog.classList.add('modal-dialog-scrollable');
        }
      },)
    })();
  } 

  onFileSelected(event, e) {
    this.members = this.images;
    this.editUser = this.members.filter(item => item.id == e);
    this.imageUrl = this.editUser[0].url;
    this.trustedUrl = this.domSanitizer.bypassSecurityTrustUrl(this.imageUrl);
    if(event.target.files) { 
      var reader = new FileReader();
      event.target.files instanceof FileList
              ? reader.readAsDataURL(event.target.files[0]) : 'handle exception'
      reader.onload=(e:any)=>{
        this.imageUrl = e.target.result;
      }
    }
  }
  update(e) {
    this.editUser = this.editForm.value;
    this.editUser.url = this.imageUrl;
    for(let i = 0; i < this.images.length; i++)
    {
      if(this.images[i].id == this.editUser.id)
      {
        this.images[i].id = this.editUser.id;
        this.images[i].url = this.editUser.url;
        this.images[i].caption = this.editUser.caption;
        alert('Updated');
      }
    }
  }
}