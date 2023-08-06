import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProsemirrorRteaModule } from 'projects/tezraine/prosemirror-rtea/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ProsemirrorRteaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
