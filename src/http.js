const axios = require('axios');

const fetchData = (api, defaultQuery) => {
  return axios
    .get(api+defaultQuery)
    .then(response => {
      return response;
    }).catch(error => {
        console.log(error);
    });
};

exports.fetchData = fetchData;
