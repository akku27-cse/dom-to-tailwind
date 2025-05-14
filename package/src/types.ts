export interface ConversionOptions {
  includeComments?: boolean;
  usePrefix?: boolean;
  prefix?: string;
  remInPx?: number;
  ignoreClasses?: string[];
  customUtilityMap?: Record<string, string>;
}