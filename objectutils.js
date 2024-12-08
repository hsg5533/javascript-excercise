/**
 * 주어진 키와 값이 배열의 객체에 포함되어 있는지 확인하는 함수
 * @param dataArray 객체 배열
 * @param activeKey 확인할 키
 * @param value 확인할 값
 * @param statusKey 추가 상태 확인할 키
 * @returns 배열에서 조건을 만족하는 객체가 존재하면 true, 아니면 false
 * @example
 * const vehicles = [{ vehicle: "car", status: true }];
 * isValueInclude(vehicles, "vehicle", "car", "status") // true
 * isValueInclude(vehicles, "vehicle", "bike", "status") // false
 */
function isValueInclude(dataArray, activeKey, value, statusKey) {
  return dataArray.some((item) => item[activeKey] === value && item[statusKey]);
}
/**
 * 주어진 배열에서 특정 키와 값을 가진 객체의 상태를 토글하는 함수
 * @param array 상태를 변경할 객체의 배열
 * @param key 객체에서 비교할 키
 * @param data 비교할 값
 * @param statusKey 상태를 변경할 키
 * @returns 상태가 변경된 새 배열
 * @example
 * const items = [{ id: "1", active: true }, { id: "2", active: false }];
 * const updatedItems = toggleStatus(items, "id", "1", "active");
 * // updatedItems는 [{ id: "1", active: false }, { id: "2", active: false }]가 됨
 */
function toggleStatus(array, key, data, statusKey) {
  return array.map((item) => {
    // 주어진 조건에 맞는 객체를 찾았을 경우
    if (item[key] === data) {
      // 상태를 토글하여 새로운 객체 반환
      return Object.assign(Object.assign({}, item), {
        [statusKey]: !item[statusKey],
      });
    }
    // 조건에 맞지 않는 객체는 그대로 반환
    return item;
  });
}
/**
 * 객체인지 여부를 확인하는 함수
 * @param obj 확인할 값
 * @returns 주어진 값이 객체이면 true, 아니면 false
 * @example
 * isObject({}) // true
 * isObject([]) // false
 * isObject(null) // false
 */
function isObject(obj) {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}
/**
 * 상태 변화 감지 함수: 이전 상태(prev)와 현재 상태(current)를 비교하여 변화를 반환함
 * @param prev 이전 상태 객체
 * @param current 현재 상태 객체
 * @returns 변경된 속성만 포함된 객체
 * @example
 * const prevState = { name: 'John', age: 30, hobbies: ['reading', 'gaming'] };
 * const currentState = { name: 'John', age: 31, hobbies: ['reading', 'traveling'] };
 * stateChanged(prevState, currentState)
 * // { age: 31, hobbies: ['reading', 'traveling'] }
 */
function stateChanged(prev, current) {
  const changes = {};
  Object.keys(current).forEach((key) => {
    const typedKey = key;
    const prevValue = prev[typedKey];
    const currentValue = current[typedKey];
    // 두 값이 배열일 경우 배열 요소를 비교
    if (Array.isArray(prevValue) && Array.isArray(currentValue)) {
      const arrayChanges = [];
      // 배열 길이가 다른 경우, 바로 변경된 배열로 기록
      if (prevValue.length !== currentValue.length) {
        changes[typedKey] = currentValue;
      } else {
        // 배열의 각 요소를 순회하며 객체일 경우 stateChanged로 재귀적으로 비교
        prevValue.forEach((prevItem, index) => {
          const currentItem = currentValue[index];
          if (isObject(prevItem) && isObject(currentItem)) {
            // 배열 내부 객체를 깊이 비교
            const itemChanges = stateChanged(prevItem, currentItem);
            if (Object.keys(itemChanges).length > 0) {
              arrayChanges[index] = itemChanges;
            }
          } else if (prevItem !== currentItem) {
            // 객체가 아닐 경우 단순 값 비교
            arrayChanges[index] = currentItem; // 변경된 값만 반영
          } else {
            arrayChanges[index] = prevItem; // 변경되지 않은 값 유지
          }
        });
        // 변경된 내용이 있으면 changes에 기록
        if (arrayChanges.length > 0) {
          changes[typedKey] = arrayChanges;
        }
      }
    }
    // 두 값이 객체일 경우 객체 내부를 비교
    else if (isObject(prevValue) && isObject(currentValue)) {
      const nestedChanges = stateChanged(prevValue, currentValue);
      if (Object.keys(nestedChanges).length > 0) {
        changes[typedKey] = nestedChanges;
      }
    }
    // 기본 값이 다를 경우 변화 기록
    else if (currentValue !== prevValue) {
      changes[typedKey] = currentValue;
    }
  });
  return changes;
}
/**
 * 객체의 배열을 업데이트하거나 새로운 항목을 추가합니다.
 *
 * @template T - 제네릭 객체 타입.
 * @param object - 타겟 배열을 포함하는 원본 객체.
 * @param change - 타겟 배열에 추가할 변경 사항.
 * @param target - 객체 내 타겟 배열의 키.
 * @param key - 타겟 배열의 항목 중 업데이트하거나 추가할 항목의 키.
 * @returns 업데이트된 타겟 배열을 포함하는 새로운 객체.
 *
 * @example
 * const examData = { exam: [{ exam1: "data" }] };
 * const insertData = { exam2: "data2" };
 * const updated = updateData(
 *   examData,
 *   insertData,
 *   "exam",
 *   Object.keys(insertData)[0]
 * );
 * // updated는 { exam: [{ exam1: "data" }, { exam2: "data2" }] }로 반환됩니다.
 */
function updateData(object, change, target, key) {
  const existingItemIndex = object[target].findIndex(
    (item) => Object.keys(item)[0] === key
  );
  if (existingItemIndex === -1) {
    return Object.assign(Object.assign({}, object), {
      [target]: [...object[target], change],
    });
  } else {
    const updated = [...object[target]];
    updated[existingItemIndex] = { [key]: change[key] };
    return Object.assign(Object.assign({}, object), { [target]: updated });
  }
}
/**
 * 객체 내에서 문자열로 구성된 배열을 찾고, 결과를 경로와 값으로 반환합니다.
 *
 * @param {Record<string, any>} object - 탐색할 객체.
 * @param {(key: string, value: any) => boolean} predicate - 검색 조건을 결정하는 함수.
 * @returns {Map<string[], any>} 검색 조건을 만족하는 경로와 값을 포함한 Map 객체.
 * @example
 * // 예시 객체
 * const exampleObject = {
 *   user: {
 *     name: "John",
 *     age: 30,
 *     address: {
 *       city: "Seoul",
 *       zip: "12345",
 *     },
 *   },
 *   items: ["apple", "banana", "cherry"],
 * };
 *
 * // 조건에 맞는 문자열 배열을 찾기 위한 predicate 함수
 * const isStringArray = (key: string, value: any) => Array.isArray(value) && value.every(item => typeof item === 'string');
 *
 * // find 함수를 호출하여 결과를 확인합니다.
 * const result = find(exampleObject, isStringArray);
 * console.log(result); // Map(1) { ['items'] => ['apple', 'banana', 'cherry'] }
 */
function find(object, predicate) {
  const result = new Map();
  const stack = [{ path: [], obj: object, depth: 0 }];
  while (stack.length > 0) {
    const { path, obj } = stack.pop();
    for (const key of Object.getOwnPropertyNames(obj)) {
      const childPath = [...path, key];
      const value = obj[key];
      if (predicate(key, value)) {
        result.set(childPath, value);
      }
      if (value instanceof Object && !Array.isArray(value)) {
        stack.push({ path: childPath, obj: value, depth: path.length + 1 });
      }
    }
  }
  return result;
}
// 예시 객체
const exampleObject = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
  hobbies: ["reading", "traveling", "cooking"],
  favoriteNumbers: [1, 2, 3],
  favoriteFoods: ["pizza", "sushi", "burger"],
};
// 문자열 배열을 찾는 조건으로 함수 호출
const resultMap = find(
  exampleObject,
  (key, value) =>
    Array.isArray(value) && value.every((item) => typeof item === "string")
);
// 결과 확인
resultMap.forEach((value, key) => {
  console.log("Path:", key, "Value:", value);
});
// 회원가입 폼 데이터 예시
const signUpData = {
  username: "JohnDoe",
  password: "",
  email: "johndoe@example.com",
  confirmPassword: "password123",
  address: {
    street: "",
    city: "New York",
    state: "NY",
  },
};
// 빈 값을 체크하는 조건으로 함수 호출
const emptyFields = find(
  signUpData,
  (key, value) => typeof value === "string" && value.trim() === ""
);
// 결과 확인 및 문구 출력
emptyFields.forEach((value, key) => {
  console.log(`"${key}" 필드에 해당 데이터가 없습니다.`);
});
