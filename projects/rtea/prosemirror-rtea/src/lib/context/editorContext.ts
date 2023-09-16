import { EditorView } from 'prosemirror-view';
import { EditorState, EditorStateConfig } from 'prosemirror-state';

export type EditorContext<E = EditorView> = {
  createEditor: () => E;
};

export class EditorViewContext implements EditorContext {
  constructor(public config: EditorStateConfig) {}

  /**
    * Create a view.
    * @param place may be a DOM node that the editor should
    be appended to, a function that will place it into the document,
    or an object whose `mount` property holds the node to use as the
    document container. If it is `null`, the editor will not be
    mounted.
    * @param instanceConfig config settings that will override the settings in this context.
    * @returns a new editor instance mounted at `place`. When finished with the editor, call `destroy` on the editor.
    */
  createEditor(
    place?:
      | null
      | HTMLElement
      | InstanceType<typeof window.Node>
      | ((editor: HTMLElement) => void)
      | {
          mount: HTMLElement;
        },
    instanceConfig?: Partial<EditorStateConfig>
  ): EditorView {
    return new EditorView(place ?? null, {
      state: EditorState.create({
        ...this.config,
        ...instanceConfig,
      }),
    });
  }
}
