/**
 * 두 버전 문자열을 비교하여 v1이 v2보다 이전 버전인지 확인하는 함수
 * @param v1 비교할 첫 번째 버전 문자열
 * @param v2 비교할 두 번째 버전 문자열
 * @returns v1이 v2보다 이전 버전이면 true, 아니면 false
 * @example
 * versionChecker("1.0.11", "1.0.12") // true
 * versionChecker("1.0.12", "1.0.11") // false
 */
function versionChecker(v1, v2) {
  const v1Array = v1.split(".").map(Number);
  const v2Array = v2.split(".").map(Number);
  for (let i = 0; i < Math.max(v1Array.length, v2Array.length); i++) {
    const num1 = v1Array[i] || 0;
    const num2 = v2Array[i] || 0;
    if (num1 < num2) {
      return true;
    } else if (num1 > num2) {
      return false;
    }
  }
  return false;
}
/**
 * 이메일 형식을 검사하는 함수
 * @param mail 검사할 이메일 문자열
 * @returns 유효하지 않은 이메일이면 true, 유효한 이메일이면 false
 * @example
 * emailchecker("hsg5533") // true (유효하지 않음)
 * emailchecker("hsg5533@naver.com") // false (유효함)
 */
function emailchecker(mail) {
  return !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
}
/**
 * 생년월일 형식을 검사하는 함수
 * @param number 검사할 생년월일 문자열
 * @returns 유효하지 않으면 true, 유효하면 false
 * @example
 * birthDayChecker("20200120") // false (유효함)
 * birthDayChecker("20201120") // false (유효함)
 * birthDayChecker("2020-01-20") // true (유효하지 않음)
 */
function birthDayChecker(number) {
  if (!parseInt(number, 10)) {
    return true;
  } else if (number.length !== 8) {
    return true;
  } else {
    return !/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
      number
    );
  }
}
/**
 * 전화번호 형식을 검사하는 함수
 * @param number 검사할 전화번호 문자열
 * @returns 유효하지 않으면 true, 유효하면 false
 * @example
 * phoneNumberChecker("+82-010-1234-5678") // true (유효하지 않음)
 * phoneNumberChecker("010-8765-4321") // true (유효하지 않음)
 * phoneNumberChecker("0108765432112") // true (유효하지 않음)
 * phoneNumberChecker("123-456-7890") // false (유효함)
 */
function phoneNumberChecker(number) {
  if (!parseInt(number, 10)) {
    return true;
  } else if (number.length !== 11) {
    return true;
  } else {
    return !/^(?:\+82|0)(10|1[1-9])-?([0-9]{3,4})-?([0-9]{4})$/.test(number);
  }
}
/**
 * 닉네임의 유효성을 검사하는 함수
 * @param nickname 검사할 닉네임 문자열
 * @returns 유효하지 않으면 에러 메시지, 유효하면 "닉네임 통과"
 * @example
 * nicknameChecker("한글닉네임한글가나다라마바사") // "10자 이상"
 * nicknameChecker("닉@ 네임") // "유효하지 않음"
 * nicknameChecker("닉네임") // "닉네임 통과"
 */
function nicknameChecker(nickname) {
  if (nickname.indexOf(" ") !== -1) {
    return "공백 존재";
  } else if (nickname.length > 10) {
    return "10자 이상";
  } else if (!/^[가-힣 1-9]*$/.test(nickname)) {
    return "유효하지 않음";
  } else {
    return "닉네임 통과";
  }
}
/**
 * 이름의 유효성을 검사하는 함수
 * @param name 검사할 이름 문자열
 * @returns 유효하지 않으면 true, 유효하면 false
 * @example
 * nameChecker("ㄱㄷㄱㄷ") // true
 * nameChecker("정호상") // false
 * nameChecker("정호상거") // true
 * nameChecker("John Apple") // false
 */
function nameChecker(name) {
  if (name.length <= 1) {
    return true;
  } else {
    return !/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/.test(name);
  }
}
/**
 * 시간 문자열을 분으로 변환하는 함수
 * @param time 변환할 시간 문자열 (형식: "HH:mm")
 * @returns 총 분 수
 * @example
 * convertToMinutes("01:00") // 60
 * convertToMinutes("02:30") // 150
 */
function convertToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
/**
 * 두 시간 문자열을 비교하여 상태에 따라 결과를 반환하는 함수
 * @param dateStatus 날짜 상태 (true: 날짜가 유효하지 않음)
 * @param time1 비교할 첫 번째 시간 문자열
 * @param time2 비교할 두 번째 시간 문자열
 * @returns 조건에 따라 true 또는 false를 반환
 * @example
 * timeChecker(!true, "01:00", "12:00") // true
 */
function timeChecker(dateStatus, time1, time2) {
  if (dateStatus) {
    return false;
  } else {
    const minutes1 = convertToMinutes(time1);
    const minutes2 = convertToMinutes(time2);
    if (minutes1 < minutes2) {
      return false;
    } else if (minutes1 > minutes2) {
      return true;
    } else {
      return true;
    }
  }
}
/**
 * 사업자 등록번호의 유효성을 검사하는 함수
 * @param number 검사할 사업자 등록번호 문자열
 * @returns 유효하면 true, 유효하지 않으면 false
 * @example
 * checkCorporateNumber("123-45-67891") // false (유효하지 않음)
 * checkCorporateNumber("123-45-6789") // true (유효함)
 */
function checkCorporateNumber(number) {
  const numberMap = number
    .replace(/-/gi, "")
    .split("")
    .map((d) => parseInt(d, 10));
  if (numberMap.length === 10) {
    const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
    let chk = 0;
    keyArr.forEach((d, i) => {
      chk += d * numberMap[i];
    });
    chk += Math.floor((keyArr[8] * numberMap[8]) / 10);
    return Math.floor(numberMap[9]) === (10 - (chk % 10)) % 10;
  }
  return false;
}
/**
 * 객체 배열 내의 특정 필드가 빈 문자열인지 검사하는 함수
 * @param list 검사할 객체 배열
 * @param fields 검사할 필드 목록
 * @returns 빈 필드가 하나라도 있으면 true, 없으면 false
 * @example
 * const careerList = [
 * { start_career_time: "2020", end_career_time: "2023", text: "Engineer" },
 * { start_career_time: "", end_career_time: "2022", text: "Developer" },
 * ];
 * emptyFieldChecker(careerList, ["start_career_time", "end_career_time", "text"])
 */
function emptyFieldChecker(list, fields) {
  return list.some((item) => fields.some((field) => item[field] === ""));
}
