const request = require('request');

const weather = function (lat, lng, callback) {
  const url = 'https://api.darksky.net/forecast/66eb2c6c79bb06a8f3c82382bd4f5237/'+ lat +','+lng+'?lang=es';

  request({url:url, json:true, }, (error, resp) => {

    if(error){
      console.log('Unable to connect to weather service!');
      console.log(error);
      callback('Error server', undefined);
    } else if(resp.body.error){
      console.log('Unable to find location!');
      callback('Error service', undefined);
    }else{
      const data = resp.body;
      const temp = data.currently.temperature;
      const precip = data.currently.precipProbability;
      const summary = data.daily.data[0].summary;
      callback(undefined, {
        temp: temp,
        summary: summary,
        precip: precip
      });
    }
  
  });
}


module.exports = weather;