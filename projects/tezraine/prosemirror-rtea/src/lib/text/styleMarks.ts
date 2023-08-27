import { Attrs, MarkSpec } from 'prosemirror-model';

export interface StyledMarkSpec<T> extends MarkSpec {}

export type StyleCSSProp = Exclude<
  {
    [P in keyof CSSStyleDeclaration]: CSSStyleDeclaration[P] extends string
      ? P
      : never;
  }[keyof CSSStyleDeclaration],
  number
>;

export function createStyledMarkSpec<T>(
  style: StyleCSSProp,
  defaultValue: T,
  tag: string = 'span'
): StyledMarkSpec<T> {
  return {
    attrs: { [style]: { default: defaultValue } },
    parseDOM: [
      {
        tag,
        style,
        getAttrs(dom): Attrs | null {
          return typeof dom === 'string'
            ? null
            : {
                [style]: dom.style[style],
              };
        },
      },
    ],
    toDOM(mark) {
      const dom = document.createElement(tag);
      dom.style[style] = mark.attrs[style];
      return { dom, contentDOM: dom };
    },
  };
}

export const basicStyleMarks = {
  fontFamily: createStyledMarkSpec('fontFamily', 'Arial'),
  fontSize: createStyledMarkSpec('fontSize', '12px'),
};

const fontFamilies = [
  'Arial',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT',
];

export type StyleSelectorDefinition = {
  [k: string]: { [k: string]: Attrs | null };
};

export const basicStyleMarkSelectors: StyleSelectorDefinition = {
  fontFamily: fontFamilies.reduce(
    (acc, i) => {
      acc[`Font Family: ${i}`] = { fontFamily: i };
      return acc;
    },
    { Default: { fontFamily: null } } as { [k: string]: Attrs | null }
  ),
  fontSize: Array(42)
    .fill(0)
    .reduce(
      (acc, _, i) => {
        acc[`Font Size: ${++i}`] = { fontSize: i + 'px' };
        return acc;
      },
      { Default: null } as { [k: string]: Attrs | null }
    ),
};
