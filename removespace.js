const str1 = "  이것은 테스트 문자열입니다.";
console.log("원래 문자열:", str1);
console.log("공백 제거 후 문자열:", str1.replace(/\s/g, ""));
const str2 = "   이것은 123.45 -테스트 문자열입니다.   ";
console.log("원래 문자열:", str2);
console.log(
  '숫자 이외의 값과 ".", "-" 제거 후 문자열:',
  str2.replace(/\D/g, "")
);
const input = "12a3.45-6 7 안녕하세요";
const value = input.replace(/[^\u3131-\uD79D]/g, "");
console.log(value);
if (isNaN(parseInt("123"))) {
  console.log("숫자가 아님");
} else {
  console.log("숫자가 맞음");
}
