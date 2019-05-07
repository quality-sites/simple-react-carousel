const { getData } = require('./util');

test('should print an uppercase text', done => {
  getData().then(data => {
    const title = data.data[0].hits[0].tags;
    expect(title).toEqual('fantasy, beautiful, dawn');
    done();
  });
});
