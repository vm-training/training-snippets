import axios from 'axios';
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
axios.get('https://dummyjson.com/products/1')
  .then(function (response) {
    // handle success
    const data = response.data
    console.log(data.title)
    // console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });