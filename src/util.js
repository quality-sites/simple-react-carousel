const { fetchData } = require('./http');

const getData = (api, defaultQuery) => {
  return fetchData(api, defaultQuery).then(data => {
    return data;
  });
};

exports.getData = getData;
