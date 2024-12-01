/**
 * 일반적으로 타입을 생성하여 변수에 지정할 경우
 * 타입이 union이면 각 타입에 내장함수를
 * 사용할려고 할 때 타입오류가 발생한다.
 */
// 타입을 union으로 정의가 필요한 경우 satisfies를 사용하면 된다.
const myInfo = { name: "kim", age: 20 };
myInfo.name.charAt(1);
myInfo.age.toFixed(1);
