// Pick은 타입스크립트에 기본적으로 제공되는 타입으로 객체 타입에서 하나의 타입만 선택할 수 있다
const userName = { name: "John Doe" };
const user = {
  name: "",
};
const userCopy = {
  name: "",
};
const userPartial = {};
const userRequried = {
  name: "",
  age: 0,
  married: 0,
};
