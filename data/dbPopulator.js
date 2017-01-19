var Promise     = require('bluebird');
var request     = require('request');
var bankInfo    = require('../urlmappings.json');
var fs          = require('fs');
var https       = require('https');
var path        = require('path');
var async       = require('async');
var dbManager        = require('../utilities/dbManager');


async.forEachSeries(Object.keys(bankInfo), function(item,callback){
    var resultWrapper = {};
    var filePath = path.resolve(__dirname, item.toString() +'.json')
    var tasks = [
        readWrapper.bind(null,filePath,resultWrapper),
        batchInserter.bind(null, resultWrapper)
    ];
    async.series(tasks, function(error){
        if(error){
            return callback(error);
        }
        console.log('all insertions done')
        return callback(null);
    })
});
function readWrapper(filePath , resultWrapper, callback){
    fs.readFile(filePath, function(err,data){
        if(err){
            return callback(err);
        }
        console.log(data.toString());
        resultWrapper.data = data;
        return callback(null);
    });
}
function batchInserter(wrapper, cb){
    async.forEach(wrapper.data,function(item ,callback){
        inserter(item).then(() => {
            return callback(null);
        }, (error) => {
            return callback(error);
        });
    }, function(error){
        return cb(error);
    });
}

function inserter(data){

    return new Promise( (resolve,reject) => {
        var stmt = " INSERT INTO tb_bank_details SET ?" ;

        var queryObj = {
            stmt: stmt,
            args: [data]
        };
        dbManager.runQuery(queryObj).then((result) => {
            console.log('here')
            resolve(result);
        }, (error) => {
            console.log(error.message);
            reject(error);
        });
    });
}