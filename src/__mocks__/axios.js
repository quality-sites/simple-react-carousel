import data from '../components/data.test.json';

const get = url => {
  return Promise.resolve(data);
};

exports.get = get;
