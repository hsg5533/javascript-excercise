/**
 * 시간을 'HH시 mm분' 형식으로 변환
 * @param inputTime 'HH:mm' 형식의 시간
 * @returns 변환된 시간 문자열
 * @example formattedTime('14:05') // '14시 05분'
 */
function formattedTime(inputTime) {
    const [hours, minutes] = inputTime.split(":").map(Number);
    return `${hours.toString().padStart(2, "0")}시 ${minutes
        .toString()
        .padStart(2, "0")}분`;
}
/**
 * 일수를 연도와 월로 변환
 * @param day 일수
 * @returns 변환된 연도와 월 객체
 * @example convertDayToYearMonth(400) // { year: 1, month: 1 }
 */
function convertDayToYearMonth(day) {
    return { year: Math.floor(day / 365), month: Math.floor((day % 365) / 30) };
}
/**
 * 연도와 월로 된 문자열을 포맷
 * @param input 'yyyyMM' 형식의 문자열
 * @returns 변환된 'yyyy.MM' 형식의 문자열
 * @example convertDateString('202410') // '2024.10'
 */
function convertDateString(input) {
    const match = input.match(/^(\d{4})(\d{2})$/);
    if (match) {
        const year = match[1];
        const month = match[2];
        return `${year}.${month}`;
    }
    return input;
}
/**
 * 두 시간 문자열을 비교
 * @param time1 첫 번째 시간
 * @param time2 두 번째 시간
 * @returns time1이 이전이면 -1, 이후면 1, 동일하면 0
 * @example compareTime('2024-10-10', '2024-10-11') // -1
 */
function compareTime(time1, time2) {
    const date1 = new Date(time1);
    const date2 = new Date(time2);
    const timeValue1 = date1.getTime();
    const timeValue2 = date2.getTime();
    if (timeValue1 < timeValue2) {
        return -1;
    }
    else if (timeValue1 > timeValue2) {
        return 1;
    }
    else {
        return 0;
    }
}
/**
 * 주어진 날짜와 시간의 조합이 현재 시간보다 이전인지 확인하는 함수
 * @param date 비교할 날짜 문자열 (형식: "YYYY-MM-DD")
 * @param time 비교할 시간 문자열 (형식: "HH:mm")
 * @returns 입력된 시간이 현재 시간보다 이전이면 true, 아니면 false
 * @example
 * isTimeBeforeNow("2024-10-19", "12:00") // true (입력된 시간이 현재 시간보다 이전인 경우)
 * isTimeBeforeNow("2024-10-19", "18:00") // false (입력된 시간이 현재 시간보다 이후인 경우)
 */
function isTimeBeforeNow(date, time) {
    const now = new Date();
    // 현재 날짜에 입력된 시간 설정
    const [hours, minutes] = time.split(":").map(Number);
    const inputTime = new Date(date);
    inputTime.setHours(hours, minutes, 0, 0); // 시, 분, 초, 밀리초 설정
    // 입력된 시간이 오늘 날짜와 동일하지 않으면 false 반환
    if (inputTime.getFullYear() !== now.getFullYear() ||
        inputTime.getMonth() !== now.getMonth() ||
        inputTime.getDate() !== now.getDate()) {
        return false;
    }
    return inputTime.getTime() < now.getTime(); // 시간이 현재 시간보다 이전인지 확인
}
/**
 * 날짜 객체를 주어진 형식으로 포맷
 * @param date 날짜 객체
 * @param format 포맷 문자열
 * @returns 포맷된 날짜 문자열
 * @example formatDate(new Date(), 'yyyy-MM-dd') // '2024-10-19'
 */
function formatDate(date, format) {
    if (!date.valueOf())
        return " ";
    const weekName = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
    ];
    return format.replace(/(yyyy|yy|MM|M|dd|E|e|hh|HH|mm|ss|a\/p|A\/P|FFFF|SSSS)/g, function ($1) {
        switch ($1) {
            case "yyyy":
                return date.getFullYear().toString().padStart(2, "0");
            case "yy":
                return (date.getFullYear() % 100).toString().padStart(2, "0");
            case "MM":
                return (date.getMonth() + 1).toString().padStart(2, "0");
            case "dd":
                return date.getDate().toString().padStart(2, "0");
            case "E":
                return weekName[date.getDay()];
            case "HH":
                return date.getHours().toString().padStart(2, "0");
            case "mm":
                return date.getMinutes().toString().padStart(2, "0");
            case "ss":
                return date.getSeconds().toString().padStart(2, "0");
            default:
                return $1;
        }
    });
}
/**
 * 주어진 밀리초 값을 일, 시간, 분, 초로 변환하여 문자열로 반환하는 함수
 * @param time 변환할 시간(밀리초 단위)
 * @returns 일, 시간, 분, 초를 포함하는 문자열
 * @example
 * const result = calculateTimeParts(90061000); // "1일 1시간 1분 1초"
 */
function calculateTimeParts(time) {
    // 일 수 계산
    const day = Math.floor(time / 1000 / 60 / 60 / 24);
    // 시간 계산
    const hour = Math.floor((time / 1000 / 60 / 60) % 24);
    // 분 계산
    const minute = Math.floor((time / 1000 / 60) % 60);
    // 초 계산
    const second = Math.floor((time / 1000) % 60);
    // 각각의 문자열 생성
    const dayString = day > 0 ? `${day}일 ` : "";
    const hourString = hour > 0 ? `${hour}시간 ` : "";
    const minuteString = minute > 0 ? `${minute}분 ` : "";
    const secondString = second > 0 ? `${second}초 ` : "";
    // 최종 문자열 반환
    return `${dayString}${hourString}${minuteString}${secondString}`.trim();
}
/**
 * 주어진 밀리초 값을 연, 월, 일, 시간, 분, 초로 변환하여 문자열로 반환하는 함수
 * @param time 변환할 시간(밀리초 단위)
 * @returns 연, 월, 일, 시간, 분, 초를 포함하는 문자열
 * @example
 * const result = timePart(31536000000); // "1년 "
 */
function timePart(time) {
    // 년 수 계산
    const year = Math.floor(time / (1000 * 60 * 60 * 24 * 365));
    // 월 수 계산
    const month = Math.floor((time % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    // 일 수 계산
    const day = Math.floor(time / 1000 / 60 / 60 / 24);
    // 시간 계산
    const hour = Math.floor((time / 1000 / 60 / 60) % 24);
    // 분 계산
    const minute = Math.floor((time / 1000 / 60) % 60);
    // 초 계산
    const second = Math.floor((time / 1000) % 60);
    // 각각의 문자열 생성
    const yearString = year > 0 ? `${year}년 ` : "";
    const monthString = month > 0 ? `${month}개월 ` : "";
    const dayString = day > 0 ? `${day}일 ` : "";
    const hourString = hour > 0 ? `${hour}시간 ` : "";
    const minuteString = minute > 0 ? `${minute}분 ` : "";
    const secondString = second > 0 ? `${second}초 ` : "";
    // 최종 문자열 반환
    return `${yearString}${monthString}${dayString}${hourString}${minuteString}${secondString}`.trim();
}
/**
 * 0시부터 24시까지의 시간을 문자열 배열로 생성하는 함수
 * @returns 24시간 형식의 시간 문자열 배열
 * @example
 * const hours = getHours(); // ["00:00", "01:00", ..., "24:00"]
 */
function getHours() {
    const hours = [];
    // 0부터 24까지 반복하여 시간을 생성
    for (let i = 0; i <= 24; i++) {
        const timeString = i < 10 ? "0" + i + ":00" : i + ":00"; // 시간 형식 조정
        hours.push(timeString); // 배열에 추가
    }
    return hours; // 결과 반환
}
/**
 * 5분부터 90분까지 5분 간격의 분 문자열 배열을 생성하는 함수
 * @returns 5분 간격의 분 문자열 배열
 * @example
 * const minutes = getMinutes(); // ["05분", "10분", ..., "90분"]
 */
function getMinutes() {
    const minutes = [];
    // 5분부터 90분까지 5분 간격으로 반복
    for (let i = 5; i <= 90; i += 5) {
        const timeString = i < 10 ? "0" + i + "분" : i + "분"; // 분 형식 조정
        minutes.push(timeString); // 배열에 추가
    }
    return minutes; // 결과 반환
}
/**
 * 0시 0분부터 23시 59분까지의 모든 조합 시간을 문자열 배열로 생성하는 함수
 * @returns 시, 분 형식의 조합 문자열 배열
 * @example
 * const combinedTimes = getCombinedTime(); // ["00시 00분", "00시 01분", ..., "23시 59분"]
 */
function getCombinedTime() {
    const combinedTimes = [];
    // 시간과 분 조합 생성
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute++) {
            const hourString = hour < 10 ? "0" + hour : "" + hour; // 시 형식 조정
            const minuteString = minute < 10 ? "0" + minute : "" + minute; // 분 형식 조정
            const timeString = `${hourString}시 ${minuteString}분`; // 최종 문자열 생성
            combinedTimes.push(timeString); // 배열에 추가
        }
    }
    return combinedTimes; // 결과 반환
}
/**
 * 5분부터 90분까지의 시간을 시, 분 형식으로 변환하여 문자열 배열로 생성하는 함수
 * @returns 시, 분 형식의 문자열 배열
 * @example
 * const convertMinutes = getConvertMinutes(); // ["05분", "10분", "1시간", "1시간 5분", ..., "90분"]
 */
function getConvertMinutes() {
    const minutes = [];
    // 5분부터 90분까지 5분 간격으로 반복
    for (let i = 5; i <= 90; i += 5) {
        let timeString;
        // 60분을 초과하는 경우 시와 분으로 분리
        if (i > 60) {
            const hours = Math.floor(i / 60); // 시간 계산
            const remainingMinutes = i % 60; // 남은 분 계산
            timeString =
                remainingMinutes === 0
                    ? `${hours}시간` // 남은 분이 없을 경우
                    : `${hours}시간 ${remainingMinutes}분`; // 시와 분 모두 포함
        }
        else {
            timeString = i < 10 ? "0" + i + "분" : i + "분"; // 60분 이하의 경우
        }
        minutes.push(timeString); // 배열에 추가
    }
    return minutes; // 결과 반환
}
