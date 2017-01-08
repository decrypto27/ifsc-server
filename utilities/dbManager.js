
////////////////////////////////////////////////////////////////////////
//                          Modules                                   //
////////////////////////////////////////////////////////////////////////

var mysql    = require('mysql');
var Promise  = require('bluebird');


////////////////////////////////////////////////////////////////////////
//                          Db Credentials                            //
////////////////////////////////////////////////////////////////////////
var pool     = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'vijay',
  password        : 'goalvijay',
  database        : 'mysql'
});


////////////////////////////////////////////////////////////////////////
//                          Exports                                   //
////////////////////////////////////////////////////////////////////////

exports.runQuery = runQuery;

function runQuery(queryObj){
  return new Promise((resolve, reject) => {
        pool.query(queryObj.stmt, queryObj.args, (err, result) => {
          if(err ){
            return reject(err);
          }
          return resolve(result);
        });
    });
};
