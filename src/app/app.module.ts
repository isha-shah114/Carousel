import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SliderComponent } from './slider/slider.component';
import { AppComponent } from './app.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { EditFormModalComponent } from './edit-form-modal/edit-form-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    FormModalComponent,
    InlineEditComponent,
    EditFormModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormModalComponent]
})
export class AppModule { }
