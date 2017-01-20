
////////////////////////////////////////////////////////////////////////
//                          Modules                                   //
////////////////////////////////////////////////////////////////////////
var Promise = require('bluebird');


////////////////////////////////////////////////////////////////////////
//                          Dependencies                              //
////////////////////////////////////////////////////////////////////////
var dbManager   = require('../utilities/dbManager');


////////////////////////////////////////////////////////////////////////
//                          Exports                                   //
////////////////////////////////////////////////////////////////////////


exports.ifscValidator  = ifscValidator;
exports.getBankDetails = getBankDetails;
exports.getBankImage   = getBankImage;
exports.getBankAddress = getBankAddress;
exports.getBankMicr    = getBankMicr;


////////////////////////////////////////////////////////////////////////
//                          Middlewares                               //
////////////////////////////////////////////////////////////////////////

function ifscValidator(req, res, next){
    var ifsc = req.params.code;

    var ifscRegex = /^[A-Za-z]{4}\d{7}$/;

    if( !ifsc || !ifscRegex.test(ifsc) ){
        return res.send({
            status  : "FAILURE",
            message : "No such bank was found.Please try again with some other ifsc."
        });
    }
    next();
}


////////////////////////////////////////////////////////////////////////
//                          APIs                                      //
////////////////////////////////////////////////////////////////////////

function getBankDetails(req,res){

    var ifsc = req.params.code;
    var response = {};
    Promise.coroutine( function * (){
        var bankInfo = yield getBankDetails(ifsc);
        response = {
            status : "SUCCESS",
            info : bankInfo[0]
        };
        return response;
    })().catch((error) => {
        response = {
            status : "FAILURE",
            message : "Please try again later."
        };
        return response;
    }).then((response) => {
        return res.send(response);
    });
    function getBankDetails(code){
        return new Promise( (resolve,reject) => {
            var stmt = " SELECT a.ifsc , b.bank_name as name, a.address, a.micr, a.city,a.district, a.state  " +
                " FROM tb_bank_details a JOIN tb_banks  b ON a.bank_id = b.id AND a.ifsc = ?" ;

            var queryObj = {
                stmt: stmt,
                args: [code]
            };
            dbManager.runQuery(queryObj).then((result) => {
                if(!result.length){
                    return reject(new Error('No such bank exists with the given IFSC'));
                }
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }
}
function getBankMicr(req,res){
    var requiredParam = 'micr';
    processRequestsInternal(req,res,requiredParam);
}
function getBankImage(req,res){
    var requiredParam = 'bank_image_url';
    processRequestsInternal(req,res,requiredParam);
}
function getBankAddress(req,res){
    var requiredParam = 'address';
    processRequestsInternal(req,res,requiredParam);
}
function processRequestsInternal(req,res,params){

    var ifsc = req.params.code;
    var response = {};
    Promise.coroutine( function * (){
        var bankInfo = yield getDetailsInternal(ifsc, params);
        response = {
            status : "SUCCESS",
            info : bankInfo[0]
        };
        return response;
    })().catch((error) => {
        response = {
            status  : "FAILURE",
            message : "Please try again later."
        };
        return response;
    }).then((response) => {
        return res.send(response);
    });
}

function getDetailsInternal(code, requiredParams){

    return new Promise( (resolve,reject) => {
        var stmt = " SELECT a." + requiredParams + "  " +
            " FROM tb_bank_details a JOIN tb_banks  b ON a.bank_id = b.id AND a.ifsc = ?" ;

        var queryObj = {
            stmt: stmt,
            args: [code]
        };
        dbManager.runQuery(queryObj).then((result) => {
            if(!result.length){
                return reject(new Error('No such bank exists with the given IFSC'));
            }
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
}


