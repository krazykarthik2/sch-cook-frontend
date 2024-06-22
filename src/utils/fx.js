const splitList = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
const unique = (arr) => {
  return Array.from(new Set(arr));
};
export { splitList, unique };
