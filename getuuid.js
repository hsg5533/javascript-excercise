function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 3) | 8;
    return v.toString(16);
  });
}
console.log(getUUID());
function generateUniqueUUID() {
  let uuid;
  const generatedUUIDs = new Set();
  do {
    uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 3) | 8;
        return v.toString(16);
      }
    );
  } while (generatedUUIDs.has(uuid));
  generatedUUIDs.add(uuid);
  return uuid;
}
console.log(generateUniqueUUID());
