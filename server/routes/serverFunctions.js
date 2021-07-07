const PAGE_SIZE = 9;

const filterByCategory = (items, category) => {
  items = items.filter((item) => {
    return item.master;
  });
  if (category === 'כל המוצרים' || category === '') return items;
  return items.filter((item) => {
    return item.category.includes(category);
  });
};

const sortItems = (items, sort) => {
  switch (sort) {
    case 'best-selling':
      return items; // TODO
    case 'price-high-to-low':
      return items.sort((a, b) => b.price - a.price);
    case 'price-low-to-high':
      return items.sort((a, b) => a.price - b.price);
    case 'newest-items':
      return items.sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    default:
      return items;
  }
};

const sliceItems = (items, page) => {
  const start = (page - 1) * PAGE_SIZE;
  const end = page * PAGE_SIZE;
  return items.slice(start, end);
};

const getNumOfPages = (items) => {
  return Math.ceil(items.length / PAGE_SIZE);
};

const calculateShipment = (items) => {
  return items.length * 20;
};

module.exports = {
  filterByCategory,
  sortItems,
  sliceItems,
  getNumOfPages,
  calculateShipment,
};
