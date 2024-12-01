function snakeToCamel(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => snakeToCamel(item));
    }
    const newObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
            newObj[camelKey] = snakeToCamel(obj[key]);
        }
    }
    return newObj;
}
// Example usage:
const snakeCaseObj = {
    first_name: "john_bak",
    last_name: "Doe",
    contact_info: {
        email_address: "john.doe@example.com",
        phone_number: "123-456-7890",
    },
    hobbies: ["reading_books", "playing_games"],
};
console.log(snakeToCamel(snakeCaseObj));
