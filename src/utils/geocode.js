const request = require('request');

const geocode = (address, callback) => {
  const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmhlcmRvaXphIiwiYSI6ImNqaHRjMXg3eDBjM2Qzdmp4eXJicThhMnIifQ.QXL3CY_ardSHJuI_cWhgFQ';
  request({
    url: urlMap,
    json: true,
  }, (error, resp) => {
    if (error) {
      console.log('Unable to connect to geo service!');
      console.log(error);
      callback('Error', undefined);
    } else if (resp.body.features && resp.body.features.length <= 0) {
      console.log('Unable to find location!');
      callback('Error Unable to find location!', undefined);
    } else {
      const data = resp.body;
      const lng = data.features[0].center[0];
      const lat = data.features[0].center[1];

      console.log(lat, lng);
      callback(undefined, {
        lat: lat,
        lng: lng,
        location: data.features[0].place_name
      });
    }
  });
}

module.exports = geocode;