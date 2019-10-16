fetch('http://puzzle.mead.io/puzzle').then(resp => {
  resp.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.querySelector('form');
const inputSearch = document.querySelector('input');
const paragraphResp = document.querySelector('#response-message');

function callWeather(address) {

  paragraphResp.textContent = 'Loading...';

  fetch('http://localhost:3000/weather?address=' + address).then(resp => {
    resp.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        paragraphResp.innerHTML = data.error;
      } else {
        console.log(data);
        paragraphResp.innerHTML = data.forecast;
      }
    });
  });
}




weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const addressValue = inputSearch.value;
  callWeather(addressValue);
});