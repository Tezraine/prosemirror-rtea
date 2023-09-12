import { Component, Input } from '@angular/core';
import {
  ControlSet,
  Button,
  HTMLRender,
  Control,
  Select,
} from '@rtea/prosemirror-rtea';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'artea-toolbar',
  templateUrl: './rtea-toolbar.component.html',
  styleUrls: ['./rtea-toolbar.component.scss'],
})
export class RteaToolbarComponent {
  @Input()
  buttons: ControlSet = [];

  @Input()
  set update(_: unknown) {
    this.updateRender();
  }

  public updateRender() {
    return true; // TODO: implement this!
  }

  asButton(item?: Control) {
    if (item?.type === 'button') {
      return item;
    }

    return null;
  }

  asSelector(item?: Control) {
    if (item?.type === 'select') {
      return item;
    }

    return null;
  }

  asGroup(item?: Control) {
    if (item?.type === 'group') {
      return item;
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

  render(html: HTMLRender, button?: HTMLElement): string | HTMLElement {
    if (typeof html === 'function') {
      return this.render(html(), button);
    }

    if (typeof html !== 'string') {
      button?.appendChild(html);
      html = '';
    }

    return html;
  }

  onSelectChange(selector: Select, event: Event) {
    selector.onChange(
      selector.options[(event.target as HTMLSelectElement).value]
    );
  }
}
