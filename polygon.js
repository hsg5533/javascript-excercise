// 거리 계산
function dist(lat1, lng1, lat2, lng2) {
  const R = 6371; // 지구 반지름 (km)
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 중심 좌표 계산
function centroid(pts) {
  if (pts.length === 2) {
    return { lat: (pts[0].x + pts[1].x) / 2, lng: (pts[0].y + pts[1].y) / 2 };
  }
  let x = 0,
    y = 0,
    area = 0;
  pts.forEach((cur, i, arr) => {
    const prev = arr[i === 0 ? arr.length - 1 : i - 1];
    const a = cur.y * prev.x - prev.y * cur.x;
    x += (cur.x + prev.x) * a;
    y += (cur.y + prev.y) * a;
    area += 3 * a;
  });
  return { lat: x / area, lng: y / area };
}

// 필터링
function filter(features, lat, lng, radius) {
  return features
    .map((feature) => {
      const pts = [];
      const { geometry: g, properties: p } = feature;
      if (g.type === "Polygon") {
        g.coordinates[0].forEach(([lng, lat]) => pts.push({ x: lat, y: lng }));
      } else if (g.type === "MultiPolygon") {
        g.coordinates.forEach((poly) =>
          poly[0].forEach(([lng, lat]) => pts.push({ x: lat, y: lng }))
        );
      }
      return pts.length ? { locate: centroid(pts), region: p.adm_nm } : null;
    })
    .filter((r) => dist(lat, lng, r.locate.lat, r.locate.lng) <= radius);
}

const lat = 37.5665;
const lng = 126.978;
const radius = 1;

fetch("https://hsg5533.github.io/hang-jeong-dong/json/ver20241001.json")
  .then((res) => res.json())
  .then((data) => {
    const regions = filter(data.features, lat, lng, radius);
    console.log(regions.map((r) => r.region));
  });
