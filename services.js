const { city_names } = require('./city');

let newObj = [];

function makeJsonData() {
    city_names.map(city => {
        let space = [];
        let string = city.charAt(0);
        if (city.indexOf(' ') >= 0) {
            for (let i = 0; i < city.length; i++) {
                if (city.charAt(i) === ' ') {
                    space.push(i);
                }
            }
            space.map(spaceIndex => {
                let alldata = city.charAt(spaceIndex + 1);
                string = string + alldata;
            });
            let obj = {
                city: city,
                cityCode: string
            }
            newObj.push(obj);
        } else {
            let obj = {
                city: city,
                cityCode: null
            }
            newObj.push(obj);
        }
    })
}
makeJsonData();



function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
exports.replaceAll = function (str, match, replacement) {
    return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
}
function replaceAll(str, match, replacement) {
    return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
}

exports.dateFormatter = function (res) {
    let newFormat = replaceAll(res, '-', '/');
    return newFormat
}

exports.checkCity = function (cityName) {
    return newObj.some(alldata => {
        if (alldata.city === cityName) {
            return true;
        } else if (alldata.cityCode === cityName) {
            return true;
        } else {
            return false;
        }
    });
}

exports.checkFullForm = function (res) {
    let city = '';
    newObj.some(alldata => {
        if (alldata.cityCode == res || alldata.city == res) {
            city = alldata.city;
        }
    })
    return city;
}



