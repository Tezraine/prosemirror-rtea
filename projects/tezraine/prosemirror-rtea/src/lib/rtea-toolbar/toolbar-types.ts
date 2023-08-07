import { Observable } from 'rxjs';
import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import { MarkSpec } from 'prosemirror-model';
import { TemplateRef } from '@angular/core';

/**
 * innerHTML text, HTML element, or a function to generate one on load.
 */
export type HTMLRender = string | HTMLElement | (() => HTMLRender);

export type Button = {
  title: string;
  content: HTMLRender;
  /** template to use if provided. implicit context will be set to text result of content */
  template?: TemplateRef<string>;
  onClick?: (event: MouseEvent) => void;
  disabled?: Observable<boolean> | (() => boolean);
};

export type ButtonGroup = {
  title: string;
  content: (Button | ButtonGroup)[];
};

export type ButtonSet = (Button | ButtonGroup)[];

export function markButtons(
  marks: { [k: string]: MarkSpec },
  view: EditorView
): ButtonSet {
  if (!view || !marks) {
    return [];
  }
  return Object.keys(marks).map((key) => {
    const command = toggleMark(view.state.schema.marks[key]);
    return {
      title: key,
      content: key,
      // disabled: () => command(view.state),
      onClick: (e) => {
        command(view.state, view.dispatch, view);
        view.focus();
      },
    } as Button;
  });
}
