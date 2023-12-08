enum PluralRules {
  SINGULAR = 'one',
  PLURAL = 'other',
}

export const PLURAL_SUFFIXES: Record<string, [string, string][]> = {
  default: [
    [PluralRules.SINGULAR, ''],
    [PluralRules.PLURAL, 's'],
  ],
  box: [
    [PluralRules.SINGULAR, ''],
    [PluralRules.PLURAL, 'es'],
  ],
  pcs: [
    [PluralRules.SINGULAR, ''],
    [PluralRules.PLURAL, ''],
  ],
};
