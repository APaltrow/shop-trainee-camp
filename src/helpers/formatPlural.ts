import { PLURAL_SUFFIXES } from '@constants';

const pluralRules = new Intl.PluralRules('en-US');

export const formatPlural = (noun: string, number: number) => {
  const rule = pluralRules.select(number);
  const suffixes = PLURAL_SUFFIXES[noun] || PLURAL_SUFFIXES.default;
  const suffix = new Map(suffixes).get(rule) || '';

  return `${noun}${suffix}`;
};
