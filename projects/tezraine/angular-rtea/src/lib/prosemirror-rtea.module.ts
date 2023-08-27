import { NgModule } from '@angular/core';
import { RteaToolbarComponent } from './rtea-toolbar/rtea-toolbar.component';
import { CommonModule } from '@angular/common';
import { RteaEditorComponent } from './rtea-editor/rtea-editor.component';

@NgModule({
  declarations: [RteaToolbarComponent, RteaEditorComponent],
  imports: [CommonModule],
  exports: [RteaToolbarComponent, RteaEditorComponent],
})
export class ProsemirrorRteaModule {}
