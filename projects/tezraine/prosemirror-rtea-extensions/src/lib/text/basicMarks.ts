import { MarkSpec, ParseRule } from 'prosemirror-model';

export function getTagMarkSpec(tag: string, rules?: ParseRule[]): MarkSpec {
  return {
    parseDOM: [
      { tag },
      {
        getAttrs: (value) => {
          return value === tag ? null : false;
        },
      },
      ...(rules ?? []),
    ],
    toDOM() {
      return [tag, 0];
    },
  };
}

export const basicMarks = {
  blockquote: getTagMarkSpec('blockquote'),
  code: getTagMarkSpec('code'),
  em: getTagMarkSpec('em'),
  nobreak: getTagMarkSpec('nobr'),
  strike: getTagMarkSpec('strike'),
  strong: getTagMarkSpec('strong'),
  super: getTagMarkSpec('super'),
  sub: getTagMarkSpec('sub'),
  mark: getTagMarkSpec('mark'),
  underline: getTagMarkSpec('underline'),
};
