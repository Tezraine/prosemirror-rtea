import { Component, OnInit } from '@angular/core';
import {
  OnChangePlugin,
  basicMarks,
} from 'projects/tezraine/prosemirror-rtea-extensions/src/public-api';
import { markButtons } from 'projects/tezraine/prosemirror-rtea/src/public-api';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { baseKeymap } from 'prosemirror-commands';

const { blockquote, ...basicNodes } = schema.nodes;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private observer = new OnChangePlugin();
  updates = this.observer.onUpdate();

  schema = new Schema({
    nodes: basicNodes,
    marks: basicMarks,
  });
  plugins = [
    history(),
    keymap({ 'Mod-z': undo, 'Mod-y': redo }),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    this.observer,
  ];
  buttons = (editor: EditorView) => markButtons(basicMarks, editor);

  ngOnInit(): void {
    this.observer.onUpdate().subscribe((s) => console.info('update:', s));
    this.observer.onChange().subscribe((s) => console.info('change:', s));
  }
}
