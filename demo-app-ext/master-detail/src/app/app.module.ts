import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { ButtonComponentComponent } from './button-component/button-component.component';
import { BakComponentComponent } from './bak-component/bak-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponentComponent,
    BakComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
