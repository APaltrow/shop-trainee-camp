const ONE_ITEM = 1;

export const checkIfPlural = (text: string, count: number) => {
  return count > ONE_ITEM ? `${text}s` : text;
};
