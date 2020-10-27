'use strict';

var Stage = require('../models/StageModel.js');
const converter = require('json-2-csv');
const fs = require('fs');


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


exports.list_all_stages = function (req, res) {
  Stage.getAllStage(function (err, stages) {
    if (err)
      res.send(err);
    res.send(stages);
  });
};

exports.list_stage_byeleveId = function (req, res) {
  Stage.getStageByEleveId(req.params.eleveId, function (err, stages) {
    if (err)
      res.send(err);
    res.send(stages);
  })
}

exports.list_stage_byVal = function (req, res) {
  Stage.getStage(req.params.val, function (err, stages) {
    if (err)
      res.send(err);
    res.send(stages);
  })
}

exports.list_stage_bytuteurId = function (req, res) {
  Stage.getStageByTuteurId(req.params.tuteurId, function (err, stages) {
    if (err)
      res.send(err);
    res.send(stages);
  })
}

exports.list_stage_byensId = function (req, res) {
  Stage.getStageByEnsId(req.params.ensId, function (err, stages) {
    if (err)
      res.send(err);
    res.send(stages);
  })
}

exports.current_stage = function (req, res) {
  Stage.getCurrentStageByEleveId(req.query.annee, req.query.eleveId, function (err, result) {
    if (err)
      res.send(err);
    res.status(200).send(result);
  })
}

exports.current_tuteur_stage = function (req, res) {
  Stage.getCurrentStageByTuteurId(req.query.annee, req.query.tuteurId, function (err, result) {
    if (err)
      res.send(err);
    res.status(200).send(result);
  })
}

exports.current_ens_stage = function (req, res) {
  Stage.getCurrentStageByEnsId(req.query.annee, req.query.ensId, function (err, result) {
    if (err)
      res.send(err);
    res.status(200).send(result);
  })
}


exports.list_stage_byId = function (req, res) {
  Stage.getStageById(req.params.idstage, function (err, stage) {
    if (err)
      res.send(err);
    res.send(stage);
  })
}


exports.list_stage_byIdForEval = function (req, res) {
  Stage.getStageByIdForEval(req.params.idstage, function (err, stage) {
    if (err)
      res.send(err);
    res.send(stage);
  })
}
