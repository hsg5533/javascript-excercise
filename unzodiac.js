const zodiacList = [
  "쥐",
  "소",
  "호랑이",
  "토끼",
  "용",
  "뱀",
  "말",
  "양",
  "원숭이",
  "닭",
  "개",
  "돼지",
];
function getZodiacYears(startYear, endYear) {
  const zodiacYears = [];
  for (let year = startYear; year <= endYear; year++) {
    const zodiacIndex = (year - 4) % 12; // 4년부터 시작하는 경우 (쥐띠는 4년부터 시작)
    if (zodiacIndex === 0) {
      zodiacYears.push(`${year}: ${zodiacList[zodiacIndex]}`);
    }
  }
  return zodiacYears;
}
// 사용 예시:
const currentYear = new Date().getFullYear();
const zodiacYears = getZodiacYears(1900, currentYear);
console.log(zodiacYears);
