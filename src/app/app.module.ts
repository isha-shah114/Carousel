import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SliderComponent } from './slider/slider.component';
import { AppComponent } from './app.component';
import { FormModalComponent } from './form-modal/form-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    FormModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [FormModalComponent]
})
export class AppModule { }
