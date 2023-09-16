import { EditorViewContext } from './editorContext';
import { EditorView, EditorState, DOMParser } from '../../public-api';
import { schema } from 'prosemirror-schema-basic';

describe('EditorViewContext', () => {
  it('should create an editor view with default configuration', () => {
    const context = new EditorViewContext({ schema });
    const editorView = context.createEditor();

    expect(editorView).toBeInstanceOf(EditorView);
    expect(editorView.state).toBeInstanceOf(EditorState);
    // Add more assertions as needed
  });

  it('should create an editor view with custom configuration', () => {
    const node = document.createElement('div');
    node.innerHTML = 'Hello, world!';
    const doc = DOMParser.fromSchema(schema).parse(node);
    const context = new EditorViewContext({});
    const editorView = context.createEditor(null, { doc });

    expect(editorView).toBeInstanceOf(EditorView);
    expect(editorView.state).toBeInstanceOf(EditorState);
    expect(editorView.state.doc.textContent).toBe('Hello, world!');
  });
});
