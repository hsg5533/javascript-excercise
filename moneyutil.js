function addCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function calcVATIncluded(priceWithVAT, vatRate = 0.1) {
    const supply = Math.round(priceWithVAT / (1 + vatRate));
    const vat = Math.round(priceWithVAT - supply);
    return { supply, vat };
}
function calcTotalPrice(supply, vatRate = 0.1) {
    const vat = Math.round(supply * vatRate);
    const total = Math.round(supply + vat);
    return { total, vat };
}
function calculateSavings(deposit, rate, months) {
    let total = 0;
    const monthlyRate = rate / 12 / 100;
    for (let month = 1; month <= months; month++) {
        total += deposit * Math.pow(1 + monthlyRate, months - month + 1);
    }
    return total.toFixed(2); // 소수점 둘째 자리까지 표시
}
// 예시: 월 30만원, 연 5%, 12개월 적금
const deposit = 150000;
const interestRate = 5; // 5%
const month = 60;
const amount = calculateSavings(deposit, interestRate, month);
console.log(`적금 만기 금액: ${amount}원`);
// 예시 1: 부가가치세 포함 150,000원인 경우
const priceWithVAT = 10000;
const result1 = calcVATIncluded(priceWithVAT);
console.log("공급가액:", addCommas(result1.supply), "원");
console.log("부가가치세:", addCommas(result1.vat), "원");
// 예시 2: 공급가액 150,000원인 경우
const supply = 10000;
const result2 = calcTotalPrice(supply);
console.log(`합계 금액: ${result2.total}원`);
console.log(`부가가치세: ${result2.vat}원`);
