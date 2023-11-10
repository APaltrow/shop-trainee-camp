export const getAlreadyActiveBrands = (
  brands: string[],
  activeBrands: string[],
) => {
  return brands.filter((brand) => activeBrands.includes(brand));
};
