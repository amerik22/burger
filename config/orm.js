var connection = require("./connection.js");


function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Cheeseburger'} => ["name='Cheeseburger"]
        // e.g. {devoured: true} => ["devouredtrue"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

  var orm = {
      selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      },
      insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + 
        table +  
        " (" +
        cols.toString() 
        + ") " +
        "VALUES (" +
        printQuestionMarks(vals.length) +
        ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
      // An example of objColVals would be {burger_name: panther, devoured: true}
      updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table + 
        " SET " + objToSql(objColVals) +
        " WHERE " + condition;
    
        console.log(queryString);
        connection.query(queryString, objColVals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
    };
    
   
// Export the ORM object in module.exports.
    module.exports = orm;