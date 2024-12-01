function throttle(fn, delay) {
  let last = 0;
  let result;
  let timer;
  return (...args) => {
    const now = Date.now();
    const remaining = delay - (now - last);
    if (remaining <= 0) {
      last = now;
      result = fn(...args);
      if (timer) {
        clearTimeout(timer);
      }
      timer = undefined;
      return result;
    }
    if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        result = fn(...args);
        timer = undefined;
        return result;
      }, remaining);
    }
  };
}

// 테스트 함수: 호출될 때마다 현재 시간과 호출 횟수를 출력
const callback = () => {
  console.log(`${new Date().toISOString()}`);
  return "dd";
};

// 스로틀된 함수 바로 반환 (250ms 스로틀 설정)
const throttled = throttle(callback, 250);

// 반복 호출 시작
const intervalId = setInterval(() => {
  console.log("called throttle function");
  const tt = throttled(); // 스로틀된 함수 호출
  console.log(tt);
}, 1); // 매우 짧은 간격으로 호출

// 3초 후에 setInterval 종료 및 마지막 실행
setTimeout(() => {
  clearInterval(intervalId); // 3초 후 interval 중지
  console.log("3 seconds elapsed, forcing final execution...");
}, 3000); // 3초 대기
