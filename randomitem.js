function getRandomWeightedItem(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const randomWeight = Math.random() * totalWeight;
  let accumulatedWeight = 0;
  if (items.length === 0) {
    return null;
  }
  for (const item of items) {
    accumulatedWeight += item.weight;
    if (randomWeight <= accumulatedWeight) {
      return item.name;
    }
  }
  return null;
}
console.log(
  `선택된 아이템: ${getRandomWeightedItem([
    { name: "아이템1", weight: 10 },
    { name: "아이템2", weight: 5 },
    { name: "아이템3", weight: 6 },
  ])}`
);
