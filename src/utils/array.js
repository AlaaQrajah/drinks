const getRandomItems = (arr, n) => {
  if (!Array.isArray(arr)) return [];
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export { getRandomItems };
