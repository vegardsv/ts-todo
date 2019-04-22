export const uuid = () => {
  return Math.random()
    .toString()
    .replace(".", "");
};
