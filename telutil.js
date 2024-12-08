/**
 * 전화번호를 하이픈(-) 형식으로 변환하는 함수
 * @param number 변환할 전화번호 문자열
 * @returns 하이픈이 추가된 전화번호 문자열
 * @example
 * const formattedNumber = telWithHyphen("01012345678"); // "010-1234-5678"
 */
function telWithHyphen(number) {
  // 숫자가 아닌 모든 문자를 제거
  const tel = number.replace(/[^0-9]/g, "");
  // 전화번호 길이에 따른 형식 규칙 배열
  const rules = [
    { size: 7, rule: `${tel.substring(0, 3)}-${tel.substring(3)}` }, // 7자리 전화번호 형식
    { size: 8, rule: `${tel.substring(0, 4)}-${tel.substring(4)}` }, // 8자리 전화번호 형식
    {
      size: 10,
      rule: tel.startsWith("02") // 10자리 전화번호의 경우, 서울 지역번호 처리
        ? `${tel.substring(0, 2)}-${tel.substring(2, 6)}-${tel.substring(6)}` // 02로 시작
        : `${tel.substring(0, 3)}-${tel.substring(3, 6)}-${tel.substring(6)}`, // 그 외 지역번호
    },
    {
      size: 11,
      rule: `${tel.substring(0, 3)}-${tel.substring(3, 7)}-${tel.substring(7)}`, // 11자리 전화번호 형식
    },
  ];
  // 규칙을 순회하며 전화번호 길이에 맞는 형식 반환
  for (const item of rules) {
    if (tel.length === item.size) {
      return item.rule; // 해당 규칙의 전화번호 형식 반환
    }
  }
  // 유효한 전화번호 길이가 아닐 경우 원래 입력된 번호 반환
  return number;
}
/**
 * 전화번호를 하이픈(-) 형식으로 변환하는 함수
 * @param phoneNumber 변환할 전화번호 문자열
 * @returns 하이픈이 추가된 전화번호 문자열
 * @example
 * const formattedNumber = getPhoneNumberWithHyphen("01012345678"); // "010-1234-5678"
 */
function getPhoneNumberWithHyphen(phoneNumber) {
  // 숫자가 아닌 모든 문자를 제거하여 전화번호에서 숫자만 남김
  let number = phoneNumber.replace(/[^0-9]/g, "");
  let phone = "";
  // 전화번호 길이에 따라 하이픈 추가
  if (number.length < 4) {
    return number; // 4자리 미만의 경우 원래 숫자 반환
  } else if (number.length < 7) {
    // 4자리 이상 7자리 미만인 경우
    phone += number.substring(0, 3); // 앞 3자리
    phone += "-"; // 앞 3자리와 나머지 부분을 구분하기 위해 하이픈 추가
    phone += number.substring(3); // 나머지 부분
  } else if (number.length < 11) {
    // 7자리 이상 11자리 미만인 경우
    phone += number.substring(0, 3); // 앞 3자리
    phone += "-"; // 앞 3자리와 다음 3자리 부분을 구분하기 위해 하이픈 추가
    phone += number.substring(3, 6); // 다음 3자리
    phone += "-"; // 다음 3자리와 나머지 부분을 구분하기 위해 하이픈 추가
    phone += number.substring(6); // 나머지 부분
  } else {
    // 11자리 이상인 경우
    phone += number.substring(0, 3); // 앞 3자리
    phone += "-"; // 앞 3자리와 다음 4자리 부분을 구분하기 위해 하이픈 추가
    phone += number.substring(3, 7); // 다음 4자리
    phone += "-"; // 다음 4자리와 나머지 부분을 구분하기 위해 하이픈 추가
    phone += number.substring(7); // 나머지 부분
  }
  return phone; // 하이픈이 추가된 전화번호 반환
}
