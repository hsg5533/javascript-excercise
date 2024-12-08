/**
 * 배열에서 특정 값을 제거
 * @param arr 배열
 * @param values 제거할 값들
 * @returns 값이 제거된 배열
 * @example removeArray([1, 2, 3, 2], 2) // [1, 3]
 */
function removeArray(arr, ...values) {
  return arr.filter((item) => !values.includes(item));
}
/**
 * 배열에서 특정 인덱스의 값을 제거
 * @param arr 배열
 * @param index 제거할 인덱스
 * @returns 값이 제거된 배열
 * @example removeIndexArray([1, 2, 3], 1) // [1, 3]
 */
function removeIndexArray(arr, index) {
  return arr.filter((_, i) => i !== index);
}
/**
 * 배열에서 특정 키의 값이 특정 문자열을 포함하는 항목을 필터링
 * @param arr 배열
 * @param searchKey 키
 * @param searchText 검색할 문자열
 * @returns 필터링된 배열
 * @example filterArrayText([{ name: 'John' }, { name: 'Jane' }], 'name', 'Jane') // [{ name: 'Jane' }]
 */
function filterArrayText(arr, searchKey, searchText) {
  return arr.filter((item) =>
    item[searchKey].toLowerCase().includes(searchText.toLowerCase())
  );
}
/**
 * 두 배열을 병합하고, 특정 키로 중복을 제거
 * @param arr1 첫 번째 배열
 * @param arr2 두 번째 배열
 * @param key 중복을 제거할 키
 * @returns 병합된 배열
 * @example mergeArrayObject([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], 'id') // [{ id: 1 }, { id: 2 }, { id: 3 }]
 */
function mergeArrayObject(arr1, arr2, key) {
  const map = new Map(arr1.map((item) => [item[key], item]));
  arr2.forEach((item) => map.set(item[key], item));
  return Array.from(map.values());
}
/**
 * 배열을 그룹화
 * @param arr 배열
 * @param groupSize 그룹의 크기
 * @returns 그룹화된 배열
 * @example groupArray([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
function groupArray(arr, groupSize) {
  const result = [];
  for (let i = 0; i < arr.length; i += groupSize) {
    result.push(arr.slice(i, i + groupSize));
  }
  return result;
}
/**
 * 이차원 배열의 인덱스를 그룹화
 * @param arr 이차원 배열
 * @returns 인덱스 배열
 * @example groupedIndex([[1, 2], [3, 4]]) // [0, 1]
 */
function groupedIndex(arr) {
  return arr.map((_, i) => i);
}
/**
 * 배열을 주어진 크기로 분할
 * @param arr 배열
 * @param chunkSize 분할할 크기
 * @returns 분할된 배열
 * @example splitArray([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
 */
function splitArray(arr, chunkSize) {
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}
/**
 * 범위 내의 숫자를 배열로 반환
 * @param min 최소값
 * @param max 최대값
 * @returns 숫자 범위 배열
 * @example getRangeArray(1000, 2000) // [1000, 1500, 2000]
 */
function getRangeArray(min, max) {
  const result = [];
  for (let i = min; i <= max; i += 500) {
    result.push(i);
  }
  return result;
}
/**
 * 배열에서 특정 키의 값이 특정 값과 일치하는 항목의 개수를 반환
 * @param array 객체 배열
 * @param key 검색할 키 (속성 이름)
 * @param value 검색할 값
 * @returns 조건에 맞는 항목의 개수
 * @example
 * const data = [
 *   { name: 'John', age: 30 },
 *   { name: 'Jane', age: 25 },
 *   { name: 'John', age: 40 }
 * ];
 * getLength(data, 'name', 'John') // 2
 */
function getLength(array, key, value) {
  let count = 0;
  for (const item of array) {
    if (item[key] === value) {
      count++;
    }
  }
  return count;
}
/**
 * 주어진 데이터가 배열에 포함되어 있는지 확인하는 함수
 * @param dataArray 객체 배열
 * @param data 포함 여부를 확인할 객체
 * @returns 배열에 주어진 객체가 존재하면 true, 아니면 false
 * @example
 * const data = { exam: [{ exam1: "data" }] };
 * isInclude(data.exam, { exam1: "data" }) // true
 * isInclude(data.exam, { exam1: "not_data" }) // false
 */
function isInclude(dataArray, data) {
  return dataArray.some(
    (item) => JSON.stringify(item) === JSON.stringify(data)
  );
}
/**
 * 제네릭 배열을 특정 속성 기준으로 정렬하는 함수
 *
 * @template T - 제네릭 객체 타입
 * @param items - 정렬할 객체 배열
 * @param key - 정렬할 객체 속성 키
 * @param isAscending - 오름차순 여부 (기본값은 true)
 * @returns 정렬된 객체 배열
 *
 * @example
 * // 비용 데이터를 cost 속성으로 오름차순 정렬
 * const costs = [
 *   { cost: "17000", detail: "7km", etc: "", keyword: "배달" },
 *   { cost: "15000", detail: "5km", etc: "", keyword: "배달" },
 * ];
 * const sortedCosts = sortByKey(costs, 'cost');
 * console.log(sortedCosts);
 *
 * @example
 * // 헬퍼 데이터를 helperMeter 속성으로 오름차순 정렬
 * const helpers = [
 *   { helperNickName: "프리메라", helperMeter: 4391, helperGrade: 2 },
 *   { helperNickName: "여꽁이", helperMeter: 8655, helperGrade: 1 },
 * ];
 * const sortedHelpersByMeter = sortByKey(helpers, 'helperMeter');
 * console.log(sortedHelpersByMeter);
 *
 * @example
 * // 헬퍼 데이터를 helperGrade 속성으로 내림차순 정렬
 * const sortedHelpersByGrade = sortByKey(helpers, 'helperGrade', false);
 * console.log(sortedHelpersByGrade);
 */
function sortByKey(items, key, isAscending = true) {
  return items.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    // 숫자 혹은 문자열 값을 비교
    const parsedA = typeof valueA === "string" ? parseInt(valueA) : valueA;
    const parsedB = typeof valueB === "string" ? parseInt(valueB) : valueB;
    if (isNaN(parsedA) || isNaN(parsedB)) {
      // 숫자로 변환되지 않는 값은 0으로 처리
      return isAscending ? 1 : -1;
    }
    return isAscending ? parsedA - parsedB : parsedB - parsedA;
  });
}
/**
 * 제네릭 배열을 지정된 순서에 따라 정렬하는 함수
 *
 * @template T - 제네릭 객체 타입
 * @param items - 정렬할 객체 배열
 * @param key - 정렬할 객체 속성 키
 * @param order - 정렬 순서를 정의하는 배열
 * @returns 정렬된 객체 배열
 *
 * @example
 * // 제품 데이터를 type 속성에 따라 지정된 순서대로 정렬
 * const products = [
 *   { name: "Product 1", type: "premium" },
 *   { name: "Product 2", type: "standard" },
 *   { name: "Product 3", type: "deluxe" }
 * ];
 * const order = ["standard", "deluxe", "premium"];
 * const sortedProducts = sortByOrder(products, 'type', order);
 * console.log(sortedProducts);
 *
 * @example
 * // 사용자 데이터를 level 속성에 따라 지정된 순서대로 정렬
 * const users = [
 *   { name: "Alice", level: "gold" },
 *   { name: "Bob", level: "silver" },
 *   { name: "Charlie", level: "bronze" }
 * ];
 * const order = ["bronze", "silver", "gold"];
 * const sortedUsers = sortByOrder(users, 'level', order);
 * console.log(sortedUsers);
 */
function sortByOrder(items, key, order) {
  return items.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
}
/**
 * 주어진 `items` 배열을 기준으로 `activeItems` 배열의 상태를 업데이트합니다.
 * `items`에 존재하지만 `activeItems`에 없는 항목은 새로운 객체로 추가되고,
 * 해당 항목의 상태는 `false`로 설정됩니다.
 *
 * @template T - `activeItems` 객체의 문자열 속성 키 타입.
 * @template U - `activeItems` 객체의 상태를 나타내는 불리언 속성 키 타입.
 * @param {string[]} items - 비교 대상이 되는 문자열 배열.
 * @param {Array<{ [K in T]: string } & { [S in U]: boolean }>} activeItems -
 *        활성화된 항목들의 배열로, 문자열 키와 불리언 상태를 포함합니다.
 * @param {T} key - `activeItems`에서 값을 비교할 문자열 속성 키.
 * @param {U} statusKey - `activeItems`에서 상태를 나타낼 불리언 속성 키.
 * @returns {Array<{ [K in T]: string } & { [S in U]: boolean }>}
 *          업데이트된 객체 배열로, 누락된 항목은 추가되며 상태는 `false`로 설정됩니다.
 *
 * @example
 * // 예제 1: 기본 사용
 * const items = ["apple", "banana", "cherry"];
 * const activeItems = [
 *   { name: "apple", isActive: true },
 *   { name: "banana", isActive: true },
 * ];
 * const result = updateStatus(items, activeItems, "name", "isActive");
 * console.log(result);
 * // 출력:
 * // [
 * //   { name: "apple", isActive: true },
 * //   { name: "banana", isActive: true },
 * //   { name: "cherry", isActive: false },
 * // ]
 *
 * @example
 * // 예제 2: 다른 키 사용
 * const items = ["dog", "cat"];
 * const activeItems = [
 *   { type: "dog", selected: true },
 * ];
 * const result = updateStatus(items, activeItems, "type", "selected");
 * console.log(result);
 * // 출력:
 * // [
 * //   { type: "dog", selected: true },
 * //   { type: "cat", selected: false },
 * // ]
 */
function updateStatus(items, activeItems, key, statusKey) {
  // activeItems에서 key에 해당하는 값들을 추출하여 string[] 타입으로 설정
  const activeItemValues = activeItems.map((item) => item[key]);
  const result = [...activeItems];
  items.forEach((item) => {
    // item이 activeItemValues에 포함되어 있지 않다면 새로운 객체를 추가
    if (!activeItemValues.includes(item)) {
      // result에 새로운 객체를 추가할 때, 타입을 명시적으로 지정
      result.push({ [key]: item, [statusKey]: false });
    }
  });
  return result;
}
// 사용 예제
const areas = [
  "서울",
  "경기도",
  "인천",
  "세종",
  "대전",
  "충북",
  "충남",
  "전북",
  "전남",
  "광주",
  "강원",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "제주",
];
const activeRegions = [
  { region: "경기도", regionStatus: true },
  { region: "대구", regionStatus: true },
  { region: "광주", regionStatus: true },
];
// areas 예제 호출
const updatedRegions = updateStatus(
  areas,
  activeRegions,
  "region",
  "regionStatus"
);
console.log(updatedRegions);
