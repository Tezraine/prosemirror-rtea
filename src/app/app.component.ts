import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  OnChangePlugin,
  basicMarks,
} from 'projects/tezraine/prosemirror-rtea-extensions/src/public-api';
import {
  Button,
  ButtonGroup,
  markButtons,
} from 'projects/tezraine/prosemirror-rtea/src/public-api';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { baseKeymap } from 'prosemirror-commands';
import { textElement } from './testDoc';

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
    marks: basicMarks,
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
      ...markButtons(basicMarks, editor),
      {
        title: '',
        content: [
          {
            title: 'undo',
            content: 'undo',
            onClick: () => {
              undo(editor.state, editor.dispatch, editor);
              editor.focus();
            },
          } as Button,
          {
            title: 'redo',
            content: 'redo',
            onClick: () => {
              redo(editor.state, editor.dispatch, editor);
              editor.focus();
            },
          } as Button,
        ],
      } as ButtonGroup,
    ].map((b) => {
      b = b as Button;
      b.template = ref;
      return b;
    });

  ngOnInit(): void {
    this.observer.onUpdate().subscribe((s) => console.info('update:', s));
    this.observer.onChange().subscribe((s) => console.info('change:', s));
  }
}
