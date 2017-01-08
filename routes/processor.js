
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

exports.getBankDetails = getBankDetails;


////////////////////////////////////////////////////////////////////////
//                          APIs                                      //
////////////////////////////////////////////////////////////////////////
function getBankDetails(req,res){
    var ifsc = req.query;
    if(!ifsc){
        return res.send({});
    }
    var response = {};
    Promise.coroutine( function * (){
        var bankInfo = yield getBankDetails(ifsc);
        response = bankInfo[0];
        return response;
    })().catch((error) => {
        response = {
            flag : 404,
            message : error.message
        };
        return response;
    }).then((response) => {
        return res.send(response);
    });
    function getBankDetails(code){
        return new Promise( (resolve,reject) => {
            var stmt = " SELECT a.ifsc , b.bank_name as name, a.address, a.micr, a.city,a.district, a.state , " +
                " FROM tb_bank_details a JOIN tb_banks  b ON a.bank_id = b.id AND a.ifsc = ?" ;

            var queryObj = {
                stmt: stmt,
                args: [code]
            };
            dbManager.runQuery(handlerInfo, queryObj).then((result) => {
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

