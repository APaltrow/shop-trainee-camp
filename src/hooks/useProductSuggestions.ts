import { useAppSelector } from '@redux';

export const useProductSuggestions = () => {
  const { product } = useAppSelector((state) => state.product);
  const { productsList } = useAppSelector((state) => state.products);

  if (!product) return null;

  const suggestionsList = productsList.filter(({ category, productId }) => {
    const isSameCategory = category === product.category;
    const isSameProduct = productId === product.productId;

    return isSameCategory && !isSameProduct;
  });

  return {
    suggestionsList,
  };
};
