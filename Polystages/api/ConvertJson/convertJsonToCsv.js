// require json-2-csv module
const converter = require('json-2-csv');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');
const csv = require('csvtojson');
const stageModels = require('../models/StageModel')
const request = require('request-promise');
const { success } = require('toastr');
const { info } = require('console');
const requests = require('request')


// conversion json ( stage ) to format csv 
exports.convertAllStagesJsonToCsv = function (req, res) {
  let length = req.query.data.length
  let tabStageId = req.query.data
  let stagesInfo = []
  let stages = ''

  
  //let stagesData = helloFunction(tabStageId, stages)

  tabStageId.forEach(element => {
    request('http://localhost:8080/stagesInfosById/' + element, function (error, response, body) {
    }).then(success => {
      success = success.replace(']', '')
      success = success.replace('[', ',')
      stages = stages + success
      
      if (element === tabStageId[tabStageId.length - 1]) {
      stages = stages.replace(',' ,'[')
      stages = stages + ']'
      //console.log(stages)
      let data = JSON.parse(stages)
      converter.json2csv(data, (err, csv) => {
        if (err) {
          res.send(err)
        }
    
        // print CSV string
        //console.log(csv);
    
        // write CSV to a file
        fs.writeFileSync('stages.csv', csv);
        res.send(data);
      });
    }
      
  })
  })
};

function helloFunction(tabStageId, stages) {
  let data;
  let infos;
  let infoStages = '';
    tabStageId.forEach(element => {
      request('http://localhost:8080/stagesInfosById/' + element)
        .then((success) => {
          success = success + ','
          stages = success.replace('[', '')
          stages = stages.replace(']','')
      })
      .catch(err => {    
      })
        .then(() => {
          stages = stages.replace(stages.length - 1, ']')
          console.log(stages)
          infoStages = infoStages + stages
          
          //infoStages = infoStages.replace(infoStages.length - 1, ']')
          //console.log(infoStages)
      })
    })
}
  
async function getStageInfosWithId (stageId) {
  return stageModels.getStageInfosById(stageId);
  }
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
  console.log('convert csv to json')
  res.send(json) 
};
  
exports.downloadStagesCsv = function (req, res) {
  res.download('stages.csv')
}




