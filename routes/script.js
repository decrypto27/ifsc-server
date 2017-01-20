
var request     = require('request');
var bankInfo    = require('../data/urlmappings.json');
var fs          = require('fs');
var https       = require('https');
var path        = require('path');
var async       = require('async');
var xlsx        = require('node-xlsx');


var dbMappings   = {
    IFSC: "ifsc",
    MICR: "micr",
    ADDRESS: "address",
    CITY: "city",
    DISTRICT: "district",
    STATE: "state"
};

function constructJSON(filePath, callback){// i made this because i was fed up of unstable xls to json conversion modules...so i decided to make up my own
    var obj = xlsx.parse(filePath);
    if(!obj || !obj.length){
        return callback(new Error('Invalid file or error in parsing'));
    }
    var objectPrototype = obj[0].data[0];
    var excelInfo = obj[0].data.slice(1,obj[0].data.length);

    excelInfo = excelInfo.map(function(element){
        var tempObj = {};
        for(var i=0;i<element.length; i++){
            if(dbMappings.hasOwnProperty(objectPrototype[i])) {
                tempObj[dbMappings[objectPrototype[i]]] = element[i];
            }
        }
        return tempObj;
    });
    return callback(null,excelInfo);
}


function processCodeInternal(code, resultWrapper, callback){

    var file = fs.createWriteStream(path.resolve('../data', code.toString() +'.xls'));
    getXls(file,code, function(error) {
        if (error) {
            return callback(error);
        }
        constructJSON(path.resolve('../data' , code.toString() + '.xls'),function (err, result) {
            if (err) {
                callback(err);
            }
            result = result.map(function(element){
                element.bank_code = code;
                return element;
            });

            resultWrapper.data = JSON.stringify(result);
            console.log("Finally returns");
            return callback(null);

        });
    });
}


async.forEachSeries(Object.keys(bankInfo), function(item,callback) {
    var resultWrapper = {};
    var filePath    = path.resolve('../data'  , item.toString() + '.json');
    var filePathXls = path.resolve('../data'  , item.toString() + '.xls');
    var tasks = [
        processCodeInternal.bind(null,item,resultWrapper),
        writerWrapper.bind(null, filePath,resultWrapper),
        fs.unlink.bind(null, filePathXls)
    ];
    async.series(tasks, function(error, result){
        if(error){
            console.log('here in async with '+ error.message);
            return callback(error);
        }
        return callback(null);
    });
}, function(err) {
    if(err){
        console.log('error occured');
        return;
    }
    console.log('All the files have been written');
});
function  writerWrapper(filePath, wrapper,callback) {
    return fs.writeFile(filePath, wrapper.data,'utf8', callback);
}
function getXls(file,code, callback){
    var options = {
        url: bankInfo[code.slice(0,4)],
        method: 'GET'
    };
    https.get(options.url, function(res) {
        res.on('data', function(data) {
            console.log('chunk recieved for '+ code);
            file.write(data);
        }).on('end',function(){
            file.end();
            console.log('xls file fetched fully for '+ code);
            setTimeout(function(){callback(null)},200);
        }).on('error',function(error){
            if(error.code == 'ECONNRESET'){
                return setTimeout(function(){ getXls(file, code, callback)}, 5000);// you can vary this
            }
            return callback(error);
        })
    });
}
