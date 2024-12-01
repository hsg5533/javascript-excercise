let csrftoken = ""; // csrfToken을 전역적으로 저장
const baseUrl = "https://localhost:3000/";
/**
 * 배열에 특정 값이 포함되어 있는지 확인합니다.
 * @param array - 검색할 배열
 * @param value - 확인할 값
 * @returns 배열에 값이 포함되어 있으면 true, 그렇지 않으면 false
 * @example
 * const numbers = [1, 2, 3, 4];
 * console.log(includes(numbers, 2)); // true
 * console.log(includes(numbers, 5)); // false
 */
function includes(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
}
/**
 * 로그 메시지를 콘솔에 출력합니다.
 * @param level - 로그 레벨 (log, warn, error, info, debug)
 * @param message - 출력할 메시지
 * @param data - 추가로 출력할 데이터 (선택 사항)
 * @example
 * log("info", "This is an info message", { data: 123 });
 * log("error", "This is an error message");
 */
function log(level, message, data) {
  if (includes(["log", "warn", "error", "info", "debug"], level)) {
    console[level](message, JSON.stringify(data, null, 2) || "");
  }
}
/**
 * 주어진 쿠키 배열에서 CSRF 토큰을 추출합니다.
 * @param cookies - 쿠키 문자열 배열
 * @returns CSRF 토큰 문자열
 * @example
 * const cookies = ["csrftoken=abc123; path=/"];
 * const token = getCsrftoken(cookies);
 * console.log(token); // "abc123"
 */
function getCsrftoken(cookies) {
  if (cookies[0]) {
    const regex = new RegExp(`${"csrftoken"}=([^;]+)`);
    const match = cookies[0].match(regex);
    return match ? match[1] : "";
  }
  return "";
}
/**
 * 객체를 URL 쿼리 문자열 형식으로 직렬화합니다.
 * @param obj - 직렬화할 객체
 * @returns 직렬화된 쿼리 문자열
 * @example
 * const params = { name: "John", age: 30 };
 * const queryString = serialize(params);
 * console.log(queryString); // "name=John&age=30"
 */
function serialize(obj) {
  const str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}
/**
 * 주어진 URL로 HTTP 요청을 보내는 비동기 함수입니다.
 *
 * @param {string} url - 요청을 보낼 URL입니다.
 * @param {object} query - URL에 추가될 쿼리 매개변수입니다.
 * @param {object} params - 요청 본문에 포함될 파라미터입니다.
 * @param {RequestMethod} method - HTTP 요청 메서드(GET, POST 등)를 지정합니다.
 * @returns {Promise<any>} 응답 본문을 JSON 형식으로 변환한 결과를 반환합니다.
 * @throws {Error} 요청 중 에러가 발생할 경우 콘솔에 에러 메시지를 출력합니다.
 *
 * @example
 * const url = "https://api.example.com/data";
 * const query = { search: "example" };
 * const params = { key: "value" };
 * const method = "POST"; // 또는 "GET"
 *
 * requestMini(url, query, params, method)
 *   .then((data) => {
 *     console.log("응답 데이터:", data);
 *   })
 *   .catch((error) => {
 *     console.error("요청 중 오류 발생:", error);
 *   });
 */
async function requestMini(url, query, params, method) {
  try {
    const response = await fetch(`${url}?${serialize(query)}`, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: method === "GET" ? null : JSON.stringify(params),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Exception during API fetch process...");
    }
  }
}
/**
 * 주어진 URL로 HTTP 요청을 보내는 비동기 함수입니다.
 *
 * @param {string} url - 요청을 보낼 URL입니다.
 * @param {object} query - URL에 추가될 쿼리 매개변수입니다.
 * @param {object} params - 요청 본문에 포함될 파라미터입니다.
 * @param {RequestMethod} method - HTTP 요청 메서드(GET, POST 등)를 지정합니다.
 * @returns {Promise<any>} 응답 본문을 JSON 형식으로 변환한 결과를 반환합니다.
 * @throws {Error} 요청 중 에러가 발생할 경우 콘솔에 에러 메시지를 출력합니다.
 *
 * @example
 * const url = "https://api.example.com/resource";
 * const query = { search: "test" };
 * const params = { data: "value" };
 * const method = "POST"; // 또는 "GET"
 *
 * request(url, query, params, method)
 *   .then((data) => {
 *     console.log("응답 데이터:", data);
 *   })
 *   .catch((error) => {
 *     console.error("요청 중 오류 발생:", error);
 *   });
 */
async function request(url, query, params, method) {
  try {
    const response = await fetch(`${url}?${serialize(query)}`, {
      method: method,
      headers: {
        Referer: baseUrl,
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
      body: method === "GET" ? null : JSON.stringify(params),
    });
    const cookies = response.headers.getSetCookie();
    if (cookies.length > 0) {
      csrftoken = getCsrftoken(cookies);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Exception during API fetch process...");
    }
  }
}
/**
 * 주어진 URL로 HTTP 요청을 보내는 비동기 함수입니다.
 * 요청의 응답 속도를 조절할 수 있는 추가 기능이 있습니다.
 *
 * @param {string} url - 요청을 보낼 URL입니다.
 * @param {object} [query={}] - URL에 추가될 쿼리 매개변수입니다. 기본값은 빈 객체입니다.
 * @param {object} [params={}] - 요청 본문에 포함될 파라미터입니다. 기본값은 빈 객체입니다.
 * @param {RequestMethod} [method="GET"] - HTTP 요청 메서드(GET, POST 등)를 지정합니다. 기본값은 "GET"입니다.
 * @param {number} [delay=500] - 응답 속도를 조절하기 위한 지연 시간(밀리초)입니다. 기본값은 500입니다.
 * @returns {Promise<any>} 응답 본문을 JSON 형식 또는 텍스트 형식으로 변환한 결과를 반환합니다.
 * @throws {Error} 요청 중 에러가 발생할 경우 콘솔에 에러 메시지를 출력하고 예외를 발생시킵니다.
 *
 * @example
 * const url = "https://api.example.com/resource";
 * const query = { search: "test" };
 * const params = { data: "value" };
 * const method = "POST"; // 또는 "GET"
 * const delay = 1000; // 응답 지연 시간
 *
 * requestPlus(url, query, params, method, delay)
 *   .then((data) => {
 *     console.log("응답 데이터:", data);
 *   })
 *   .catch((error) => {
 *     console.error("요청 중 오류 발생:", error);
 *   });
 */
async function requestPlus(
  url,
  query = {},
  params = {},
  method = "GET",
  delay = 500
) {
  const start = new Date().getTime();
  try {
    const response = await fetch(`${url}?${serialize(query)}`, {
      method: method,
      headers: {
        Referer: baseUrl,
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
      body: method === "GET" ? null : JSON.stringify(params),
    });
    const duration = new Date().getTime() - start;
    const contentType = response.headers.get("Content-Type") || "";
    const cookies = response.headers.getSetCookie();
    const data = contentType.includes("application/json")
      ? await response.json()
      : contentType.includes("text/html")
      ? await response.text()
      : response;
    if (cookies.length > 0) {
      csrftoken = getCsrftoken(cookies);
    }
    if (duration < delay) {
      log("debug", "so fast response please awaiting...");
      await new Promise((resolve) => setTimeout(resolve, delay - duration));
    }
    return data;
  } catch (err) {
    if (err instanceof Error) {
      log("error", "An error occurred while fetching data...");
      throw new Error("Exception during API fetch process...");
    }
  }
}
/**
 * 주어진 URL로 HTTP 요청을 보내는 비동기 함수입니다.
 * 요청의 재시도, 지연, 타임아웃 등의 기능을 지원합니다.
 *
 * @param {string} url - 요청을 보낼 URL입니다.
 * @param {object} [query={}] - URL에 추가될 쿼리 매개변수입니다. 기본값은 빈 객체입니다.
 * @param {object} [params={}] - 요청 본문에 포함될 파라미터입니다. 기본값은 빈 객체입니다.
 * @param {RequestMethod} [method="GET"] - HTTP 요청 메서드(GET, POST 등)를 지정합니다. 기본값은 "GET"입니다.
 * @param {boolean} [infinity=false] - 무한 반복 요청 여부입니다. 기본값은 false입니다.
 * @param {number} [interval=3000] - 무한 반복 요청 시 요청 간격(밀리초)입니다. 기본값은 3000입니다.
 * @param {number} [timeout=5000] - 요청 타임아웃(밀리초)입니다. 기본값은 5000입니다.
 * @param {number} [retries=1] - 요청 실패 시 재시도 횟수입니다. 기본값은 1입니다.
 * @param {number} [delay=500] - 응답 속도를 조절하기 위한 지연 시간(밀리초)입니다. 기본값은 500입니다.
 * @returns {Promise<{ time: number; data: any }>} 평균 응답 시간과 응답 본문을 포함한 객체를 반환합니다.
 * @throws {Error} 잘못된 재시도 값 또는 최대 재시도 횟수 초과 시 에러를 발생시킵니다.
 *
 * @example
 * const url = "https://api.example.com/resource";
 * const query = { search: "test" };
 * const params = { data: "value" };
 * const method = "POST"; // 또는 "GET"
 * const retries = 3; // 재시도 횟수
 * const interval = 2000; // 요청 간격
 *
 * requestPro(url, query, params, method, false, interval, 5000, retries)
 *   .then(({ time, data }) => {
 *     console.log(`응답 데이터: ${JSON.stringify(data)}, 평균 응답 시간: ${time}초`);
 *   })
 *   .catch((error) => {
 *     console.error("요청 중 오류 발생:", error);
 *   });
 */
async function requestPro(
  url,
  query = {},
  params = {},
  method = "GET",
  infinity = false,
  interval = 3000,
  timeout = 5000,
  retries = 1,
  delay = 500
) {
  let retry = 0;
  const times = [];
  if (retries <= 0) throw new Error("incorrect retries value");
  while (infinity || retry < retries) {
    const start = new Date().getTime();
    const controller = new AbortController();
    try {
      const response = await Promise.race([
        fetch(`${url}?${serialize(query)}`, {
          method: method,
          headers: {
            Referer: baseUrl,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          credentials: "include",
          signal: controller.signal,
          body: method === "GET" ? null : JSON.stringify(params),
        }),
        new Promise((_, reject) =>
          setTimeout(() => {
            controller.abort();
            reject(new Error(`Timeout: ${timeout} ms`));
          }, timeout)
        ),
      ]);
      const duration = new Date().getTime() - start;
      const durationSec = Math.floor((duration / 1000) * 100) / 100;
      const contentType = response.headers.get("Content-Type") || "";
      const cookies = response.headers.getSetCookie();
      const data = contentType.includes("application/json")
        ? await response.json()
        : contentType.includes("text/html")
        ? await response.text()
        : response;
      if (cookies.length > 0) {
        csrftoken = getCsrftoken(cookies);
      }
      log("debug", "Response data:", data);
      log("info", `Fetch completed in ${durationSec} seconds`);
      if (!infinity) {
        times.push(durationSec);
        retry++;
      }
      if (duration < delay) {
        log("debug", "Response was fast, waiting for the delay period...");
        await new Promise((resolve) => setTimeout(resolve, delay - duration));
      }
      if (retry >= retries) {
        const average =
          Math.floor((times.reduce((a, b) => a + b, 0) / times.length) * 100) /
          100;
        log("info", `Average fetch time: ${average} seconds`);
        return { time: average, data: data };
      }
    } catch (err) {
      if (err instanceof Error) {
        const duration = new Date().getTime() - start;
        const durationSec = Math.floor((duration / 1000) * 100) / 100;
        log("error", "Error during fetch:", err);
        log("info", `Fetch attempt failed after ${durationSec} seconds`);
        if (retry >= retries) {
          throw new Error("Max retries reached. Exiting...");
        }
        retry++;
      }
    } finally {
      if (infinity && interval > 0) {
        log("info", "Awaiting interval for next request...");
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
  }
  return { time: 0, data: null };
}
/**
 * HTTP 요청을 큐에 추가하고 처리하는 클래스로,
 * 요청의 우선순위, 재시도, 타임아웃 등을 관리합니다.
 * @example
 * const requestMax = new RequestMax(3, 5); // 서킷 브레이커 기준을 3, 큐 최대 요청 수를 5로 설정
 * const options: RequestOptions = {
 *   url: "https://api.example.com/data",
 *   query: { key: "value" },
 *   params: { data: "example" },
 *   method: "POST",
 *   priority: "high",
 *   beforeSend: () => console.log("Sending request..."),
 *   onSuccess: (data) => console.log("Request succeeded:", data),
 *   onError: (error) => console.error("Request failed:", error),
 * };
 *
 * requestMax.addToQueue(options);
 */
class RequestMax {
  /**
   * RequestMax의 인스턴스를 초기화합니다.
   *
   * @param {number} circuitBreakerThreshold - 서킷 브레이커가 열리는 실패 횟수 기준입니다. 기본값은 5입니다.
   * @param {number} queueLimit - 각 우선순위 큐의 최대 요청 수입니다. 기본값은 10입니다.
   */
  constructor(circuitBreakerThreshold = 5, queueLimit = 10) {
    this.circuitBreakerFailures = 0;
    this.circuitBreakerOpen = false;
    this.queue = new Map([
      ["high", []],
      ["medium", []],
      ["low", []],
    ]);
    this.queueIntervals = new Map([
      ["high", 500],
      ["medium", 1000],
      ["low", 2000],
    ]);
    this.circuitBreakerThreshold = circuitBreakerThreshold;
    this.queueLimit = queueLimit;
    this.startQueueProcessing();
  }
  /**
   * 주어진 옵션으로 HTTP 요청을 처리하는 비동기 함수입니다.
   *
   * @param {RequestOptions} options - 요청에 대한 설정 옵션입니다.
   * @returns {Promise<{ time: number; data: any }>} 요청의 평균 응답 시간과 데이터를 포함한 객체를 반환합니다.
   * @throws {Error} 잘못된 재시도 값 또는 서킷 브레이커가 열려 있는 경우 에러를 발생시킵니다.
   */
  async fetchRequest(options) {
    const {
      url,
      query = {},
      params = {},
      method = "GET",
      infinity = false,
      interval = 3000,
      timeout = 5000,
      retries = 1,
      delay = 500,
    } = options;
    let retry = 0;
    const times = [];
    if (retries <= 0) throw new Error("incorrect retries value");
    while (infinity || retry < retries) {
      const start = new Date().getTime();
      const controller = new AbortController();
      try {
        const response = await Promise.race([
          fetch(`${url}?${serialize(query)}`, {
            method: method,
            headers: {
              Referer: baseUrl,
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            credentials: "include",
            signal: controller.signal,
            body: method === "GET" ? null : JSON.stringify(params),
          }),
          new Promise((_, reject) =>
            setTimeout(() => {
              controller.abort();
              reject(new Error(`Timeout: ${timeout} ms`));
            }, timeout)
          ),
        ]);
        const duration = new Date().getTime() - start;
        const durationSec = Math.floor((duration / 1000) * 100) / 100;
        const contentType = response.headers.get("Content-Type") || "";
        const cookies = response.headers.getSetCookie();
        const data = contentType.includes("application/json")
          ? await response.json()
          : contentType.includes("text/html")
          ? await response.text()
          : response;
        if (cookies.length > 0) {
          csrftoken = getCsrftoken(cookies);
        }
        log("debug", "Response data:", data);
        log("info", `Fetch completed in ${durationSec} seconds`);
        if (!infinity) {
          times.push(durationSec);
          retry++;
        }
        if (duration < delay) {
          log("debug", "Response was fast, waiting for the delay period...");
          await new Promise((resolve) => setTimeout(resolve, delay - duration));
        }
        if (retry >= retries) {
          const average =
            Math.floor(
              (times.reduce((a, b) => a + b, 0) / times.length) * 100
            ) / 100;
          log("info", `Average fetch time: ${average} seconds`);
          return { time: average, data: data };
        }
      } catch (err) {
        if (err instanceof Error) {
          const duration = new Date().getTime() - start;
          const durationSec = Math.floor((duration / 1000) * 100) / 100;
          log("error", "Error during fetch:", err);
          log("info", `Fetch attempt failed after ${durationSec} seconds`);
          if (this.circuitBreakerFailures >= this.circuitBreakerThreshold) {
            this.circuitBreakerOpen = true;
            log("error", "Circuit breaker activated.");
          }
          if (retry >= retries) {
            throw err;
          }
          this.circuitBreakerFailures++;
          retry++;
        }
      } finally {
        if (infinity && interval > 0) {
          log("info", "Awaiting interval for next request...");
          await new Promise((resolve) => setTimeout(resolve, interval));
        }
      }
    }
    return { time: 0, data: null };
  }
  /**
   * 요청 큐를 처리하기 시작하는 메서드입니다.
   */
  startQueueProcessing() {
    this.queueIntervals.forEach((timeout, priority) => {
      setTimeout(() => {
        const queue = this.queue.get(priority);
        if (queue && queue.length > 0) {
          const request = queue.shift();
          if (request) {
            request.beforeSend && request.beforeSend();
            this.fetchRequest(request)
              .then(request.onSuccess)
              .catch(request.onError);
          }
        }
      }, timeout);
    });
  }
  /**
   * 서킷 브레이커를 초기화하는 메서드입니다.
   */
  resetCircuitBreaker() {
    this.circuitBreakerFailures = 0;
    this.circuitBreakerOpen = false;
    log("info", "Circuit breaker reset.");
  }
  /**
   * 요청을 큐에 추가하는 메서드입니다.
   *
   * @param {RequestOptions} options - 큐에 추가할 요청의 설정입니다.
   */
  addToQueue(options) {
    if (this.circuitBreakerOpen) {
      log("error", "Circuit breaker is open. Cannot add requests to queue.");
      return;
    }
    const priority = options.priority || "medium";
    const queue = this.queue.get(priority);
    if (queue && queue.length < this.queueLimit) {
      queue.push(options);
      log("info", `Request added to ${priority} priority queue.`);
    } else {
      log("error", `Queue limit exceeded for ${priority} priority.`);
    }
  }
}
