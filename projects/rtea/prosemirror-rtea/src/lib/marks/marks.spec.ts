import { Mark } from 'prosemirror-model';
import { createTagMarkSpec } from './tagMarks';
import { createStyledMarkSpec } from './styleMarks';

describe('createTagMarkSpec', () => {
  it('should return a MarkSpec object with the correct properties', () => {
    const tag = 'em';
    const markSpec = createTagMarkSpec(tag);

    expect(markSpec).toHaveProperty('parseDOM');
    expect(markSpec).toHaveProperty('toDOM');

    expect(markSpec.parseDOM).toEqual([{ tag: 'em' }]);
    expect(markSpec.toDOM?.(null as unknown as Mark, true)).toEqual(['em', 0]);
  });

  it('should return a MarkSpec object with custom parse rules', () => {
    const tag = 'custom';
    const rules = [{ tag: 'custom-element' }];
    const markSpec = createTagMarkSpec(tag, rules);

    expect(markSpec.parseDOM).toEqual([
      { tag: 'custom' },
      { tag: 'custom-element' },
    ]);
  });
});

describe('createStyledMarkSpec', () => {
  it('should create a StyledMarkSpec with default values', () => {
    const style = 'fontFamily';
    const defaultValue = 'Arial';
    const tag = 'span';

    const result = createStyledMarkSpec(style, defaultValue, tag);

    expect(result.attrs?.[style]).toEqual({ default: defaultValue });
    expect(result.parseDOM?.[0].getAttrs?.('lies')).toEqual(null);
    const element = document.createElement(tag);
    element.style[style] = defaultValue;
    const attrs = { [style]: defaultValue };
    const dom = result.toDOM?.({ attrs } as unknown as Mark, true) as {
      dom: HTMLElement;
      contentDOM?: HTMLElement;
    };
    expect(result.parseDOM?.[0].getAttrs?.(dom?.dom)).toEqual(attrs);
  });
});
