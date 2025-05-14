import { DomToTailwind } from './converter';
export * from './types';

export async function convertToTailwind(html: string, options?: any): Promise<string> {
  const converter = new DomToTailwind(options);
  return await converter.convert(html);
}

export { DomToTailwind };