import { EditorState, Plugin, PluginKey } from 'prosemirror-state';
import { BehaviorSubject, Observable } from 'rxjs';

export const onChangeKey = new PluginKey('OnDocChanged');

/**
 * This plugin watches the EditorView for doc updates, and provides on onChange and onUpdate state emitter
 */
export class OnChangePlugin extends Plugin {
  private changed = new BehaviorSubject<EditorState | undefined>(undefined);
  private updated = new BehaviorSubject<EditorState | undefined>(undefined);

  /**
   * emits the state of the editor on change, or null if the editor hasn't loaded.
   *
   * @return {Observable<EditorState | undefined>} An observable with the latest editor state.
   */
  public onChange(): Observable<EditorState | undefined> {
    return this.changed;
  }
  /**
   * emits the state of the editor on update, or null if the editor hasn't loaded.
   *
   * @return {Observable<EditorState | undefined>} An observable with the latest editor state.
   */
  public onUpdate(): Observable<EditorState | undefined> {
    return this.changed;
  }
  constructor() {
    super({
      state: {
        init: () => {},
        apply: (tr, _value, _oldState, newState) => {
          if (tr.docChanged) {
            this.changed.next(newState);
          }
          this.updated.next(newState);
        },
      },
    });
  }
}
