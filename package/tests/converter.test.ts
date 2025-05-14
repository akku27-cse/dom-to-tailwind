import { DomToTailwind } from '../src/converter';

describe('DomToTailwind', () => {
  let converter: DomToTailwind;

  beforeEach(() => {
    converter = new DomToTailwind();
  });

  it('should convert margin to Tailwind classes', async () => {
    const html = `<div style="margin: 1rem;"></div>`;
    const result = await converter.convert(html);
    expect(result).toContain('class="m-4"');
  });

  it('should convert padding to Tailwind classes', async () => {
    const html = `<div style="padding: 0.5rem;"></div>`;
    const result = await converter.convert(html);
    expect(result).toContain('class="p-2"');
  });

  it('should convert font size to Tailwind classes', async () => {
    const html = `<div style="font-size: 1.125rem;"></div>`;
    const result = await converter.convert(html);
    expect(result).toContain('class="text-lg"');
  });

  it('should convert background color to Tailwind classes', async () => {
    const html = `<div style="background-color: #ffffff;"></div>`;
    const result = await converter.convert(html);
    expect(result).toContain('class="bg-white"');
  });

  it('should convert complex styles to multiple Tailwind classes', async () => {
    const html = `<div style="margin: 1rem; padding: 0.5rem; background-color: #f3f4f6;"></div>`;
    const result = await converter.convert(html);
    expect(result).toContain('class="m-4 p-2 bg-gray-100"');
  });

  it('should preserve existing classes', async () => {
    const html = `<div class="existing-class" style="margin: 1rem;"></div>`;
    const result = await converter.convert(html);
    expect(result).toContain('class="existing-class m-4"');
  });

  it('should handle custom prefix', async () => {
    const customConverter = new DomToTailwind({ usePrefix: true, prefix: 'tw-' });
    const html = `<div style="margin: 1rem;"></div>`;
    const result = await customConverter.convert(html);
    expect(result).toContain('class="tw-m-4"');
  });
});