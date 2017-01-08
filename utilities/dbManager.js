var mysql    = require('mysql');
var Promise  = require('bluebird');
var pool     = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'vijayattri',
  password        : 'itsnotasecret',
  database        : 'bankdb'
});

var dbManager = {
    runQuery : function(queryObj){
      return new Promise((resolve, reject) => {
            pool.query(queryObj.stmnt, queryObj.args, (err, result) => {
              if(err ){
                return reject(err);
              }
              return resolve(result);
            });
        });
    },
};


exports.dbManager = dbManager;