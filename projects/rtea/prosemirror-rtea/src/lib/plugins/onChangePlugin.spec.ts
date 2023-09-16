import { Observable, firstValueFrom } from 'rxjs';
import { OnChangePlugin } from './onChangePlugin';
import { EditorViewContext } from '../context/editorContext';
import { schema } from 'prosemirror-schema-basic';

describe('OnChangePlugin', () => {
  test('onChange() should return an Observable<EditorState | undefined>', () => {
    const plugin = new OnChangePlugin();
    const result = plugin.onChange();

    expect(result).toBeInstanceOf(Observable);
  });

  test('onUpdate() should return an Observable<EditorState | undefined>', () => {
    const plugin = new OnChangePlugin();
    const result = plugin.onUpdate();

    expect(result).toBeInstanceOf(Observable);
  });

  test('should emit the latest editor state on document change', async () => {
    const plugin = new OnChangePlugin();
    const context = new EditorViewContext({ schema, plugins: [plugin] });
    const editorView = context.createEditor();
    const events = Promise.all([
      firstValueFrom(plugin.onUpdate()),
      firstValueFrom(plugin.onChange()),
    ]);
    editorView.dispatch(editorView.state.tr.insertText('Hello'));
    await events;
  });
});
