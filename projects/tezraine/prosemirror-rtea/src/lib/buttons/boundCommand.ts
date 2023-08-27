import { EditorState, EditorView, Transaction } from './../../public-api';

export type ParamaterizedCommand<T = undefined> = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  view?: EditorView,
  opt?: T | null
) => boolean;

export class BoundCommand<P = undefined> {
  constructor(
    private editor: EditorView | (() => EditorView),
    public readonly command: ParamaterizedCommand<P>
  ) {}

  private getEditor() {
    if (typeof this.editor === 'function') {
      return this.editor();
    }

    return this.editor;
  }

  public can(param: P, editor?: EditorView) {
    return BoundCommand.can(editor ?? this.getEditor(), this.command, param);
  }

  public static can<T>(
    editor: EditorView,
    command: ParamaterizedCommand<T>,
    param: T
  ) {
    const { state } = editor;
    return command(state, undefined, undefined, param);
  }

  public dispatch(param: P, editor?: EditorView) {
    return BoundCommand.dispatch(
      editor ?? this.getEditor(),
      this.command,
      param
    );
  }

  public static dispatch<T>(
    editor: EditorView,
    command: ParamaterizedCommand<T>,
    param: T
  ) {
    const { state, dispatch } = editor;
    return command(state, dispatch, editor, param);
  }
}

/**
 * Creates a more readable command set from a BoundCommand map
 *
 * @param commands - An object containing the commands.
 * @returns An object of actionSet.<can|dispatch>.<command>()
 */
export function createCommandSet<T extends Record<string, BoundCommand<any>>>(
  actionSet: T
): {
  can: { [K in keyof T]: T[K]['can'] };
  dispatch: { [K in keyof T]: T[K]['dispatch'] };
} {
  const set = {
    can: {} as { [K in keyof T]: T[K]['can'] },
    dispatch: {} as { [K in keyof T]: T[K]['dispatch'] },
  };

  for (const key in actionSet) {
    set.can[key] = actionSet[key].can;
    set.dispatch[key] = actionSet[key].dispatch;
  }

  return set;
}
