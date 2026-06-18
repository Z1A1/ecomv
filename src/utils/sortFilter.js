export const applySort = (products, sortOption) => {
  const list = [...products];
  if (sortOption === 'price_low_high') return list.sort((a, b) => a.price - b.price);
  if (sortOption === 'price_high_low') return list.sort((a, b) => b.price - a.price);
  if (sortOption === 'rating_high_low') return list.sort((a, b) => b?.rating?.rate - a?.rating?.rate);
  return list;
};

export const applyFilter = (products, filters) => {
  if (!filters?.category) return products;
  return products.filter(product => product?.category === filters.category);
};
