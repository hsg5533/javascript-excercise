// 각도를 라디안으로 변환
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
// 삼각함수 계산
function calculateTrigonometry(angleDegrees) {
    const angleRadians = toRadians(angleDegrees);
    const sineValue = Math.sin(angleRadians);
    const cosineValue = Math.cos(angleRadians);
    const tangentValue = Math.tan(angleRadians);
    console.log(`sin(${angleDegrees}°) = ${sineValue}`);
    console.log(`cos(${angleDegrees}°) = ${cosineValue}`);
    console.log(`tan(${angleDegrees}°) = ${tangentValue}`);
}
// 예시 각도로 호출
const exampleAngle = 45;
calculateTrigonometry(exampleAngle);
// 사인 합성 공식 계산
function calculateCompositeSine(angle1, angle2) {
    const angle1Radians = toRadians(angle1);
    const angle2Radians = toRadians(angle2);
    const compositeSineValue = Math.sin(angle1Radians) * Math.cos(angle2Radians) +
        Math.cos(angle1Radians) * Math.sin(angle2Radians);
    console.log(`sin(${angle1}° + ${angle2}°) = ${compositeSineValue}`);
}
// 예시 각도로 호출
calculateCompositeSine(30, 60);
