export const usePaginate = (
  array: any[],
  pageSize: number,
  pageIndex: number,
): {
  lowerLimit: number;
  upperLimit: number;
  first: boolean;
  last: boolean;
  noOfpages: number;
  array: any[];
} => {
  const numberOfPages = Math.ceil(array?.length / pageSize);

  const lowerLimit = 0;
  const upperLimit = pageSize;

  if (pageIndex === 0)
    return {
      lowerLimit,
      upperLimit: upperLimit < array.length ? upperLimit : array.length,
      first: true,
      last: pageIndex + 1 === numberOfPages,
      noOfpages: numberOfPages,
      array,
    };

  const increment = pageIndex * pageSize;

  return {
    lowerLimit: lowerLimit + increment,
    upperLimit:
      upperLimit + increment < array.length
        ? upperLimit + increment
        : array.length,
    first: pageIndex === 0,
    last: pageIndex + 1 === numberOfPages,
    noOfpages: numberOfPages,
    array,
  };
};
