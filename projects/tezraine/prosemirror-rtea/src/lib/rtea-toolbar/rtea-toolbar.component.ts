import { Component, Input } from '@angular/core';
import { ButtonSet, Button, ButtonGroup, HTMLRender } from './toolbar-types';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'rtea-toolbar',
  templateUrl: './rtea-toolbar.component.html',
  styleUrls: ['./rtea-toolbar.component.scss'],
})
export class RteaToolbarComponent {
  @Input()
  buttons: ButtonSet = [];

  @Input()
  set update(_: unknown) {
    this.updateRender();
  }

  public updateRender() {
    return true; // TODO: implement this!
  }

  asButton(item: Button | ButtonGroup | undefined) {
    if (!Array.isArray(item?.content)) {
      return item as Button;
    }

    return null;
  }

  asButtonGroup(item: Button | ButtonGroup | undefined) {
    if (Array.isArray(item?.content)) {
      return item as ButtonGroup;
    }

    return null;
  }

  isDisabled(item: Button): Observable<boolean> {
    if (typeof item.disabled === 'function') {
      return of(item.disabled());
    }

    if (typeof item.disabled === 'object') {
      return item.disabled;
    }

    return of(!!item.disabled);
  }

  render(html: HTMLRender): string | HTMLElement {
    if (typeof html === 'function') {
      return this.render(html());
    }

    return html;
  }
}
