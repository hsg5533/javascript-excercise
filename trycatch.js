async function successFunc() {
    return await new Promise((resolve, reject) => setTimeout(() => resolve("Resolve"), 2000));
}
async function failFunc() {
    return await new Promise((resolve, reject) => setTimeout(() => reject("Reject"), 3000));
}
console.log("running functions...");
successFunc().then((value) => console.log(value));
failFunc()
    .then((value) => console.log(value))
    .catch((value) => {
    throw new Error(value);
});
