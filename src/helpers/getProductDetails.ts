export const getProductDetails = (
  country: string,
  category: string,
  brand: string,
  stock: string,
) => {
  return Object.entries({
    country,
    category,
    brand,
    stock,
  });
};

export const getProductInfo = (
  buyBy: string,
  delivery: string,
  deliveryArea: string,
) => {
  return Object.entries({
    'buy by': buyBy,
    delivery,
    'delivery area': deliveryArea,
  });
};
