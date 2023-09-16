import { Button, Control, ControlGroup, Select } from './button-types';
import { setMark } from 'dist/rtea/prosemirror-rtea/lib/commands/setMark';
import { toggleMark } from 'prosemirror-commands';
import { MarkSpec, Attrs } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { BehaviorSubject } from 'rxjs';

export function markButtons(
  marks: { [k: string]: MarkSpec },
  view: EditorView
): (Control | ControlGroup)[] {
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
  marks: {
    [markname: string]: { text: string; value: Attrs | null | undefined }[];
  },
  view: EditorView
): (Control | ControlGroup)[] {
  if (!view || !marks) {
    return [];
  }
  return Object.keys(marks).map((key) => {
    const command = setMark(view.state.schema.marks[key]);
    const tracker = new BehaviorSubject('');
    return {
      type: 'select',
      title: key,
      options: marks[key],
      selected: tracker,
      onChange: (value, key) => {
        tracker.next(key);
        command(view.state, view.dispatch, view, value);
      },
    } as Select<Attrs | null | undefined>;
  });
}
