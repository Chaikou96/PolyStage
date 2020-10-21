// require json-2-csv module
const converter = require('json-2-csv');
const fs = require('fs');

exports.convertJsonToCsv = function (req, res) {
    let data = req.params.data
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
  
