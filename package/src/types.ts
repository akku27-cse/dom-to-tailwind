export interface ConversionOptions {
  includeComments?: boolean;
  usePrefix?: boolean;
  prefix?: string;
  remInPx?: number;
  ignoreClasses?: string[];
  customUtilityMap?: Record<string, string>;

}
// Removed the module augmentation for 'postcss-js' as it requires a proper type declaration file.