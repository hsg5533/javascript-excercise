function camelToSnake(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item));
  }
  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (match) => `_${match.toLowerCase()}`
      );
      newObj[snakeKey] = camelToSnake(obj[key]);
    }
  }
  return newObj;
}
// Example usage:
const camelCaseObj = {
  firstName: "johnBak",
  lastName: "Doe",
  contactInfo: {
    emailAddress: "john.doe@example.com",
    phoneNumber: "123-456-7890",
  },
  hobbiesI: ["readingBooks", "playingGames"],
};
const snakeCaseKeysObj = camelToSnake(camelCaseObj);
console.log(snakeCaseKeysObj);
