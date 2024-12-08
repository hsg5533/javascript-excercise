// 라이프니츠의 공식
function pi1() {
  let pi = 0;
  let temp = 1;
  let p = -1;
  let num = 1;
  while (num < 10000000) {
    p *= -1;
    pi += (p * 1.0) / temp;
    temp += 2;
    num++;
  }
  console.log("라이프니츠의 공식: %.10f", 4 * pi);
}
// 월리스 공식
function pi2() {
  let pi = 1;
  let even = 2.0;
  let odd = 1.0;
  let num = 1;
  while (num < 1000000) {
    pi *= even / odd;
    if (num % 2 === 1) {
      odd += 2;
    } else {
      even += 2;
    }
    num++;
  }
  console.log("월리스 공식: %.10f", 2.0 * pi);
}
// 오일러 곱셈 공식
function pi3() {
  let pi = 0.0;
  let num = 1.0;
  while (num < 10000000) {
    pi += 1.0 / Math.pow(num, 2.0);
    num += 1.0;
  }
  console.log("오일러 곱셈 공식: %.10f", Math.sqrt(6 * pi));
}
pi1();
pi2();
pi3();
