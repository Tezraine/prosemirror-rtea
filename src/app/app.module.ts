import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ProsemirrorRteaModule } from 'projects/rtea/angular-rtea/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MatIconModule, ProsemirrorRteaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
