import { Component, Input, SecurityContext } from '@angular/core';
import { Control, ControlGroup } from './button-types';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'artea-toolbar',
  templateUrl: './rtea-toolbar.component.html',
  styleUrls: ['./rtea-toolbar.component.scss'],
})
export class RteaToolbarComponent {
  constructor(private sanitizer: DomSanitizer) {}

  @Input()
  controls: (Control | ControlGroup)[] = [];

  sortedControls(): (Control | ControlGroup)[] {
    return this.controls.sort((a, b) => {
      if ((a.priority ?? 100) < (b.priority ?? 100)) {
        return -1;
      } else if ((a.priority ?? 100) > (b.priority ?? 100)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  asButton(control: Control) {
    return control.type === 'button' ? control : null;
  }

  asSelect(control: Control) {
    return control.type === 'select' ? control : null;
  }

  asTemplate(control: Control) {
    return control.type === 'template' ? control : null;
  }

  asHTML(control: Control) {
    return control.type === 'html'
      ? this.sanitizer.sanitize(SecurityContext.HTML, control.element)
      : null;
  }

  asGroup(control: Control) {
    return control.type === 'group' ? control : null;
  }
}
