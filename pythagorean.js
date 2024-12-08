const triangles = []; // 결과값 배열 생성
for (let a = 1; a < 35; a++) {
  for (let b = a + 1; b < 45; b++) {
    for (let c = b + 1; c < 55; c++) {
      if (Math.sqrt(a ** 2 + b ** 2) === c && c <= 50) {
        let triangle = [a, b, c];
        triangles.push(triangle);
      }
    }
  }
}
console.log("세변의 길이가 50이하의 정수인 직각삼각형의 세변의 쌍 20개입니다.");
for (let i of triangles) {
  console.log(i);
}
