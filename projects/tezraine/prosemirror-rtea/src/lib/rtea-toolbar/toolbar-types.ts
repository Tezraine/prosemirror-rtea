import { Observable } from 'rxjs';
import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import { MarkSpec } from 'prosemirror-model';

/**
 * innerHTML text, HTML element, or a function to generate one on load.
 */
export type HTMLRender = string | HTMLElement | (() => HTMLRender);

export type Button = {
  title: string;
  content: HTMLRender;
  onClick?: (event: MouseEvent) => void;
  disabled?: Observable<boolean> | (() => boolean);
};

export type ButtonGroup = {
  title: string;
  content: (Button | ButtonGroup)[];
};

export type ButtonSet = (Button | ButtonGroup)[];

export function markButtons(
  basicMarks: { [k: string]: MarkSpec },
  view: EditorView
): ButtonSet {
  if (!view) {
    return [];
  }
  return Object.keys(basicMarks).map(
    (key) =>
      ({
        title: key,
        content: key,
        onClick: () => toggleMark(view.state.schema.marks[key])(view.state),
      } as Button)
  );
}
