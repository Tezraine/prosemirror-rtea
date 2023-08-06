import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Schema, Node } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';

@Component({
  selector: 'rtea-editor',
  templateUrl: './rtea-editor.component.html',
  styleUrls: ['./rtea-editor.component.scss'],
})
export class RteaEditorComponent implements OnInit, OnDestroy {
  public editor: EditorView = this.createEditor();
  constructor(private host: ElementRef) {}

  /**
   * Initial doc for the editor.
   * Providing a new value will reset the editor to a fresh and clean state
   */
  @Input()
  set doc(doc: Node) {
    this.docNode = doc;
    this.editor = this.createEditor();
  }

  private docNode?: Node;

  @Input()
  schema?: Schema;

  @Input()
  plugins: Plugin[] = [];

  createEditor() {
    const baseSchema = this.schema ?? schema;
    this.editor?.destroy();
    this.editor = new EditorView(this.host.nativeElement, {
      state: EditorState.create({
        doc: this.docNode,
        plugins: this.plugins,
        schema: baseSchema,
      }),
    });
    return this.editor;
  }

  ngOnInit(): void {
    if (!this.host?.nativeElement) {
      console.error('editor dom missing');
    }
    this.editor = this.createEditor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
