module.exports = class DistanceUtils {
    static Distance(source, target) {
        const R = 6378.137;
        const dLat = target.latitude * Math.PI / 180 - source.latitude * Math.PI / 180;
        const dLong = target.longitude * Math.PI / 180 - source.longitude * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(source.latitude * Math.PI / 180) * Math.cos(target.latitude * Math.PI / 180) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d * 1000;
    }
}