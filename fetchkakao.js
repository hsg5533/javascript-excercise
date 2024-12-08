const query = "전북 삼성동 100";
const REST_API_KEY = "5110261889bc7a6b88d643ac775f61a9";
async function fetchKakao(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    });
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`HTTP error! Status: ${err.message}`);
    }
  }
}
async function fetchKakaoAddress(address) {
  return fetchKakao(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`
  )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
const x = 129.116737490825;
const y = 35.2144318865165;
async function fetchKakaoRegion(x, y) {
  return fetchKakao(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`
  )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function fetchKakaoGeocode(x, y) {
  return fetchKakao(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`
  )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function fetchKakaoNavi(
  startLat,
  startLng,
  wayLat,
  wayLng,
  endLat,
  endLng
) {
  return fetchKakao(
    `https://apis-navi.kakaomobility.com/v1/directions?origin=${startLng},${startLat}&destination=${endLng},${endLat}&waypoints=${wayLng},${wayLat}&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`
  )
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
