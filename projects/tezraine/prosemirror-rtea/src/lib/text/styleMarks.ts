import { Attrs, MarkSpec } from 'prosemirror-model';
import { reduce } from 'rxjs';

export interface StyledMarkSpec<T> extends MarkSpec {}

export function createStyledMarkSpec<T>(
  style: string,
  tag: string = 'span'
): StyledMarkSpec<T> {
  return {
    parseDOM: [{ tag, style }],
    toDOM(mark) {
      return [tag, mark.attrs, 0];
    },
  };
}

export const basicStyleMarks = {
  fontFamily: createStyledMarkSpec<string>('font-family'),
  fontSize: createStyledMarkSpec<number>('font-size'),
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

export const basicStyleMarkSelectors: { [k: string]: { [o: string]: Attrs } } =
  {
    'Font Family': fontFamilies.reduce((acc, i) => {
      acc[`${i}`] = { fontFamily: i };
      return acc;
    }, {} as { [o: string]: Attrs }),
    'Font Size': Array(42)
      .fill(0)
      .reduce((acc, _, i) => {
        acc[`${++i}`] = { fontSize: i };
        return acc;
      }, {} as { [o: string]: Attrs }),
  };
