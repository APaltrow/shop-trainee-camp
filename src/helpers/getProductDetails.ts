export const getProductDetails = (
  country: string,
  category: string,
  brand: string,
  stock: string,
  buyBy: string,
  delivery: string,
  deliveryArea: string,
) => {
  return Object.entries({
    country,
    category,
    brand,
    stock,
    'buy by': buyBy,
    delivery,
    'delivery area': deliveryArea,
  });
};
