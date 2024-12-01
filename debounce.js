// debounce 함수를 정의한 코드 (위의 코드를 복사하여 사용)
function debounce(func = () => console.log("debounce called"), wait = 250) {
  let lastArgs, result; // 마지막 호출의 인자, 결과값 저장
  let lastCallTime; // 마지막 호출 시간을 기록
  let timerId; // 타이머 ID 저장
  // 전달된 func 가 함수가 아니면 TypeError 를 발생시킵니다.
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  // wait 인자 값 검증
  if (typeof wait !== "number" || wait < 0) {
    throw new TypeError("Expected wait to be a non-negative number");
  }
  // 주어진 시간이 지나면 호출을 허용할지 여부를 결정하는 함수
  const shouldInvoke = (time) => {
    const timeSinceLastCall = time - (lastCallTime || 0); // 마지막 호출 후 경과 시간 계산
    // 처음 호출하거나, 지정된 시간(wait)이 지났거나, 시간이 음수가 되면 true 반환
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0
    );
  };
  // 타이머가 만료되었을 때 실행되는 함수
  const timerExpired = () => {
    const time = Date.now(); // 현재 시간
    // 지정된 시간이 지났으면 함수를 실제로 호출
    if (shouldInvoke(time)) {
      timerId = undefined; // 타이머를 해제
      if (lastArgs) {
        const args = lastArgs; // 마지막 인자를 저장
        lastArgs = undefined; // 인자를 초기화
        result = func.apply(undefined, args); // 전달된 함수(func)를 호출하고 그 결과를 result 에 저장
        return result;
      }
      lastArgs = undefined; // 인자를 초기화
      return result;
    }
    // 아직 시간이 남았으면 다시 타이머를 설정해 남은 시간 동안 대기
    timerId = setTimeout(timerExpired, wait - (time - (lastCallTime || 0)));
  };
  wait = +wait || 0; // 대기 시간을 숫자로 변환하거나 기본값을 0으로 설정
  // 최종적으로 반환할 화살표 함수 (디바운스된 함수)
  return (...args) => {
    const time = Date.now(); // 현재 시간
    const isInvoking = shouldInvoke(time); // 이번 호출이 실행 가능한지 확인
    lastArgs = args; // 호출된 인자를 저장
    lastCallTime = time; // 마지막 호출 시간 기록
    // 호출이 가능하다면 타이머를 설정하고 함수를 대기시킵니다.
    if (isInvoking && timerId === undefined) {
      timerId = setTimeout(timerExpired, wait); // 지정된 시간이 지나면 함수가 실행되도록 타이머 설정
      return result; // 아직 실행되지 않았으므로 이전 결과 반환
    }
    // 타이머가 없다면 새로 설정 (이미 실행 중일 때는 타이머가 설정되지 않음)
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result; // 이전에 실행된 결과를 반환
  };
}

// 테스트 함수: 호출될 때마다 현재 시간과 호출 횟수를 출력
const callback = () => {
  console.log(`Function executed at ${new Date().toISOString()}`);
};

// 디바운스된 함수 생성 (250ms 디바운스 설정)
const debounced = debounce(callback, 250);

// 반복 호출 시작
const intervalId = setInterval(() => {
  console.log("called debouce function");
  debounced(); // 디바운스된 함수 호출
}, 1); // 매우 짧은 간격으로 호출

// 3초 후에 setInterval 종료 및 마지막 실행
setTimeout(() => {
  clearInterval(intervalId); // 3초 후 interval 중지
  console.log("3 seconds elapsed, forcing final execution...");
}, 3000); // 3초 대기
