const api = require('./api');

module.exports = class GHTTPWrapper {
    static getNearMark(position, callback) {
        const url = api.get;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                position: position,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        }).catch((err) => console.log(err));
    }

    static postMark(position, dangerLvl, ExpiredTime) {
        const url = api.post;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                position: position,
                dangerLvl: dangerLvl,
                ExpiredTime: ExpiredTime
            })
        })
        .catch((err) => console.log(err));
    }
}