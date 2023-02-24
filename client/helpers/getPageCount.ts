const getPageCount = (totalCount: number, limit = 10): number => {
  return Math.ceil(totalCount / limit);
};

export default getPageCount;
