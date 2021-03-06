const fs = require('fs');
const d3 = require('d3-dsv');

let stringData = fs.readFileSync('./data/cities_canada-usa.tsv', 'utf8');
stringData = stringData.replace(/["]/g, ''); // Force data to conform to RFC 4180 before parsing it

const citiesData = d3.tsvParse(stringData, d3.autoType);

// post processing, change comman-separated alt_name field into array of alt names
citiesData.forEach(cityData => {
  if (cityData.alt_name != null) {
    cityData.alt_name = d3.csvParseRows(cityData.alt_name); // unwrap comma-separated alternative names
    if (cityData.alt_name.length === 1) {
      cityData.alt_name = cityData.alt_name[0]; // unwrap nested array
    }
  } else {
    cityData.alt_name = []; // always provide a default so that we can alt_name.forEach
  }
});
module.exports = citiesData;
