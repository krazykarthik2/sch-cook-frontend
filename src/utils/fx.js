import { toast } from "react-toastify";

const splitList = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
const unique = (arr) => {
  return Array.from(new Set(arr));
};
const addDigits = (num, n) => {
  return "0".repeat(n - new String(num).length) + num;
};
const toastThis =  (promise, then, { pending, error, success }) => {
  toast.promise(
    new Promise(async (res, rej) => {
      try {
        const result = await promise();
        then(result);
        res();
      } catch (e) {
        rej();
      }
    }),
    { pending, error, success }
  );
};
export { splitList, unique, addDigits, toastThis };
