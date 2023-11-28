export const checkIsInList = (value: string, list: string[]) => {
  return !!list.find(
    (option) => option.toLowerCase() === value.toLowerCase().trim(),
  );
};
