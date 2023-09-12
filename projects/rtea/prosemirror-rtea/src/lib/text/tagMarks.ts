import { MarkSpec, ParseRule } from 'prosemirror-model';

export function createTagMarkSpec(tag: string, rules?: ParseRule[]): MarkSpec {
  return {
    parseDOM: [{ tag }, ...(rules ?? [])],
    toDOM() {
      return [tag, 0];
    },
  };
}

export const basicTagMarks = {
  blockquote: createTagMarkSpec('blockquote'),
  code: createTagMarkSpec('code'),
  em: createTagMarkSpec('em'),
  nobreak: createTagMarkSpec('nobr'),
  strike: createTagMarkSpec('strike'),
  strong: createTagMarkSpec('strong'),
  super: createTagMarkSpec('sup'),
  sub: createTagMarkSpec('sub'),
  mark: createTagMarkSpec('mark'),
  underline: createTagMarkSpec('u'),
};
