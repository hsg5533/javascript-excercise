/**
 * 주어진 좌표 집합의 중심점을 계산합니다.
 *
 * @param {{ x: number; y: number; }[]} points 중심점을 구할 좌표 목록
 * @returns {{x: number, y: number}} 중심점 좌표
 * @example
 * const points = [{ x: 0, y: 0 }, { x: 2, y: 2 }];
 * centerPoint(points); // { x: 1, y: 1 }
 */
function centerPoint(points) {
    if (points.length === 2) {
        return {
            x: (points[0].x + points[1].x) / 2,
            y: (points[0].y + points[1].y) / 2,
        };
    }
    else if (points.length > 2) {
        let area = 0, x = 0, y = 0;
        let p1, p2, f;
        for (let i = 0, len = points.length, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];
            f = p1.y * p2.x - p2.y * p1.x;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
            area += f * 3;
        }
        return { x: x / area, y: y / area };
    }
    else {
        return { x: points[0].x, y: points[0].y };
    }
}
/**
 * 두 지점 간의 거리를 계산합니다.
 *
 * @param {number} lat1 첫 번째 지점의 위도
 * @param {number} lon1 첫 번째 지점의 경도
 * @param {number} lat2 두 번째 지점의 위도
 * @param {number} lon2 두 번째 지점의 경도
 * @returns {number} 두 지점 간의 거리 (미터)
 * @example calculateDistance(37.7749, -122.4194, 34.0522, -118.2437); // 558km
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius (meters)
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) *
            Math.cos(phi2) *
            Math.sin(deltaLambda / 2) *
            Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
/**
 * 주어진 좌표를 기준으로 반경 내에 있는 점들을 반환합니다.
 *
 * @param {number} lat 중심점의 위도
 * @param {number} lng 중심점의 경도
 * @param {number} rad 반경 (미터)
 * @param {number} stp 좌표 계산 간격 (미터)
 * @returns {{ x: number; y: number }[]} 반경 내의 좌표 목록
 * @example getCoordinates(37.7749, -122.4194, 1000, 0.01); // 좌표 리스트 반환
 */
function getCoordinates(lat, lng, rad, stp) {
    const positions = [];
    const radius = rad;
    const stepSize = stp;
    const latitude = lat;
    const longitude = lng;
    const latMultiplier = radius / 111320;
    const lonMultiplier = radius / (111320 * Math.cos((latitude * Math.PI) / 180));
    for (let latOffset = -latMultiplier; latOffset <= latMultiplier; latOffset += stepSize) {
        for (let lonOffset = -lonMultiplier; lonOffset <= lonMultiplier; lonOffset += stepSize) {
            const lat = latitude + latOffset;
            const lng = longitude + lonOffset;
            const distance = calculateDistance(latitude, longitude, lat, lng);
            if (distance <= radius) {
                positions.push({ x: lat, y: lng });
            }
        }
    }
    return positions;
}
/**
 * 주어진 반경 내의 경계 좌표를 정확하게 계산합니다.
 *
 * @param {number} lat 중심점의 위도
 * @param {number} lon 중심점의 경도
 * @param {number} radius 반경 (미터)
 * @returns {{lat_min: number, lng_min: number, lat_max: number, lng_max: number}} 경계 좌표
 * @example getAccurateRadiusBoundary(37.7749, -122.4194, 1000); // 경계 좌표 반환
 */
function getAccurateRadiusBoundary(lat, lon, radius) {
    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;
    const earthRadiusKm = 6371.0;
    const angularRadius = radius / earthRadiusKm;
    const latMin = latRad - angularRadius;
    const latMax = latRad + angularRadius;
    const lonDegPerKm = (Math.PI / 180.0) * earthRadiusKm * Math.cos(latRad);
    const lngMin = lonRad - angularRadius / lonDegPerKm;
    const lngMax = lonRad + angularRadius / lonDegPerKm;
    return {
        lat_min: (latMin * 180) / Math.PI,
        lng_min: (lngMin * 180) / Math.PI,
        lat_max: (latMax * 180) / Math.PI,
        lng_max: (lngMax * 180) / Math.PI,
    };
}
/**
 * 주어진 중심점과 거리(km)를 기준으로 한 경계 좌표를 반환합니다.
 *
 * @param {number} centerLat 중심점의 위도
 * @param {number} centerLng 중심점의 경도
 * @param {number} kiloMeter 반경 (킬로미터)
 * @returns {{topLeft: {lat: number, lng: number}, topRight: {lat: number, lng: number}, bottomLeft: {lat: number, lng: number}, bottomRight: {lat: number, lng: number}}} 경계 좌표
 * @example getBound(37.7749, -122.4194, 10); // 경계 좌표 반환
 */
function getBound(centerLat, centerLng, kiloMeter) {
    const radian = kiloMeter / 6371;
    const deltaLat = radian * (180 / Math.PI);
    const deltaLng = (radian * (180 / Math.PI)) / Math.cos((centerLat * Math.PI) / 180);
    const topLeft = {
        lat: centerLat + deltaLat,
        lng: centerLng - deltaLng,
    };
    const topRight = {
        lat: centerLat + deltaLat,
        lng: centerLng + deltaLng,
    };
    const bottomLeft = {
        lat: centerLat - deltaLat,
        lng: centerLng - deltaLng,
    };
    const bottomRight = {
        lat: centerLat - deltaLat,
        lng: centerLng + deltaLng,
    };
    return { topLeft, topRight, bottomLeft, bottomRight };
}
