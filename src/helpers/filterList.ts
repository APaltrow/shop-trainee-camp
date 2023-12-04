export const filterList = (list: string[], value: string) => {
  if (!value) return list;

  return list.filter((option) =>
    option.toLowerCase().includes(value.trim().toLowerCase()),
  );
};
