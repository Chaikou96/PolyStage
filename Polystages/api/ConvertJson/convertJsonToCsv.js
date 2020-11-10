// require json-2-csv module
const converter = require('json-2-csv');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');
const csv = require('csvtojson');

// conversion json ( stage ) to format csv 
exports.convertAllStagesJsonToCsv = function (req, res) {
    let length = req.query.data.length
    let stages = '['
    for (let index = 0; index < length; index++) {
      if( index < length - 1 )
        stages = stages + req.query.data[index] + ','
      else 
        stages = stages + req.query.data[index]
    }
    stages = stages + ']'
    
    let data = JSON.parse(stages)
    
    //console.log(req.query.data)
      converter.json2csv(data, (err, csv) => {
          if (err) {
            res.send(err)
          }
      
          // print CSV string
          console.log(csv);
      
          // write CSV to a file
        fs.writeFileSync('stages.csv', csv);
        res.send(data);
      });
  };
  
  exports.convertOneStageJsonToCsv = function (req, res) {
    let data = JSON.parse(req.query.data) 
      converter.json2csv(data, (err, csv) => {
          if (err) {
            res.send(err)
          }

          // write CSV to a file
        fs.writeFileSync('stages.csv', csv);
        res.send(data);
      });
  };

exports.convertStagesCsvToJson = function (req, res) { 
  let json = csvToJson.getJsonFromCsv(req.query.data);
  console.log(json)
  res.send(json) 
};
  
exports.downloadStagesCsv = function (req, res) {
  res.download('stages.csv')
}
