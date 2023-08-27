/// Create a command function that toggles the given mark with the
/// given attributes. Will return `false` when the current selection
/// doesn't support that mark. This will remove the mark if any marks
/// of that type exist in the selection, or add it otherwise. If the
/// selection is empty, this applies to the [stored
/// marks](#state.EditorState.storedMarks) instead of a range of the

import { Attrs, MarkType, Node } from 'prosemirror-model';
import { SelectionRange, TextSelection } from 'prosemirror-state';
import { ParamaterizedCommand } from '../buttons/boundCommand';
import { EditorView } from 'prosemirror-view';

/**
 *
 * @param markType Mark to set on selected area.
 * @param attrs attributes to set on the mark. If null, the mark will be removed.
 * @returns true if the command can run, false otherwise.
 */
export function setMark(markType: MarkType): ParamaterizedCommand<Attrs> {
  return function (state, dispatch, _view?: EditorView, attrs?: Attrs | null) {
    let { empty, $cursor, ranges } = state.selection as TextSelection;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType))
      return false;

    if (!dispatch) {
      return true;
    }

    const remove = !attrs;
    if ($cursor) {
      remove
        ? dispatch(state.tr.removeStoredMark(markType))
        : dispatch(state.tr.addStoredMark(markType.create(attrs)));
      return true;
    }

    const tr = state.tr;
    for (const element of ranges) {
      const { $from, $to } = element;
      if (remove) {
        tr.removeMark($from.pos, $to.pos, markType);
      } else {
        let from = $from.pos,
          to = $to.pos,
          start = $from.nodeAfter,
          end = $to.nodeBefore;
        const spaceStart = spaceStartOffset(start);
        if (from + spaceStart < to) {
          from += spaceStart;
          to -= spaceEndOffset(end);
        }
        tr.addMark(from, to, markType.create(attrs));
      }
    }
    dispatch(tr.scrollIntoView());

    return true;
  };
}

function spaceStartOffset(start: Node | null) {
  return start?.isText ? /^\s*/.exec(start.text!)![0].length : 0;
}

function spaceEndOffset(end: Node | null) {
  return end?.isText ? /\s*$/.exec(end.text!)![0].length : 0;
}

function markApplies(
  doc: Node,
  ranges: readonly SelectionRange[],
  type: MarkType
) {
  for (const element of ranges) {
    let { $from, $to } = element;
    let can =
      $from.depth == 0 && doc.inlineContent && doc.type.allowsMarkType(type);
    doc.nodesBetween($from.pos, $to.pos, (node) => {
      if (can) return false;
      can = node.inlineContent && node.type.allowsMarkType(type);
      return undefined;
    });
    if (can) return true;
  }
  return false;
}
