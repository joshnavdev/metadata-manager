const _ = require('lodash');

const queryData = {
  countries: ['CO01', 'CO03'],
  customers: ['CU01', 'CU02', 'CU03', 'CU04'],
  regions: ['RE01', 'RE02'],
};

function getQuery(query) {
  let stringQuery = '';
  _.forEach(query, (filter, key) => {
    if (!_.isEmpty(filter)) {
      stringQuery += 'AND (';
      _.forEach(filter, (filt) => {
        stringQuery += `${key} = ${filt} OR `;
      });

      stringQuery = `${stringQuery.substring(0, stringQuery.length - 4)}) `;
    }
  });
  stringQuery = stringQuery.substring(4, stringQuery.length);

  return stringQuery;
}

const algo = getQuery(queryData);

console.log(algo);
