import { Observable } from 'rxjs';
import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import { Attrs, MarkSpec } from 'prosemirror-model';
import { setMark } from '../commands/setMark';

/**
 * innerHTML text, HTML element, or a function to generate one on load.
 */
export type HTMLRender = string | HTMLElement | (() => HTMLRender);

export type Button = {
  type: 'button';
  title: string;
  content: HTMLRender;
  onClick?: (event: MouseEvent) => void;
  disabled?: Observable<boolean> | (() => boolean);
};

export type Select<T> = {
  type: 'select';
  title: string;
  options: {
    [k: string]: T;
  };
  onChange(value: T): void;
  disabled?: Observable<boolean> | (() => boolean);
};

export type ControlGroup = {
  type: 'group';
  title: string;
  content: Control[];
};

export type Control = Button | Select<any> | ControlGroup;

export type ControlSet = (Control | ControlGroup)[];

export function markButtons(
  marks: { [k: string]: MarkSpec },
  view: EditorView
): ControlSet {
  if (!view || !marks) {
    return [];
  }
  return Object.keys(marks).map((key) => {
    const command = toggleMark(view.state.schema.marks[key]);
    return {
      type: 'button',
      title: key,
      content: key,
      onClick: () => {
        command(view.state, view.dispatch, view);
        view.focus();
      },
    } as Button;
  });
}

export function markSelectors(
  marks: { [k: string]: { [k: string]: Attrs } },
  view: EditorView
): ControlSet {
  if (!view || !marks) {
    return [];
  }
  return Object.keys(marks).map((key) => {
    const command = setMark(view.state.schema.marks[key]);
    return {
      type: 'select',
      title: key,
      options: marks[key],
      onChange: (value) => {
        command(view.state, view.dispatch, view, value);
      },
    } as Select<Attrs>;
  });
}
