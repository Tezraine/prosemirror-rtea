import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  OnChangePlugin,
  basicTagMarks,
  Button,
  ControlGroup,
  markButtons,
  markSelectors,
} from '../../projects/rtea/prosemirror-rtea/src/public-api';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { baseKeymap } from 'prosemirror-commands';
import { textElement } from './testDoc';
import {
  basicStyleMarkSelectors,
  basicStyleMarks,
} from '../../projects/rtea/prosemirror-rtea/src/lib/marks/styleMarks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private observer = new OnChangePlugin();
  updates = this.observer.onUpdate();

  schema = new Schema({
    nodes: schema.spec.nodes.remove('blockquote'),
    marks: {
      ...basicStyleMarks,
      ...basicTagMarks,
    },
  });
  doc = DOMParser.fromSchema(this.schema).parse(textElement);
  plugins = [
    history(),
    keymap({ 'Mod-z': undo, 'Mod-y': redo }),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    this.observer,
  ];
  buttons = (editor: EditorView, ref: TemplateRef<string>) =>
    [
      ...markButtons(basicTagMarks, editor),
      ...markSelectors(basicStyleMarkSelectors, editor),
      {
        title: '',
        content: [
          {
            type: 'button',
            title: 'undo',
            content: 'undo',
            onClick: () => {
              undo(editor.state, editor.dispatch, editor);
              editor.focus();
            },
          } as Button,
          {
            type: 'button',
            title: 'redo',
            content: 'redo',
            onClick: () => {
              redo(editor.state, editor.dispatch, editor);
              editor.focus();
            },
          } as Button,
        ],
      } as ControlGroup,
    ].map((b) => {
      b = b as Button;
      return b;
    });

  ngOnInit(): void {
    this.observer.onUpdate().subscribe((s) => console.info('update:', s));
    this.observer.onChange().subscribe((s) => console.info('change:', s));
  }
}
