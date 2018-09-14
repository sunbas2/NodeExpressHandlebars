var mysql = require("mysql");

var connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{
  connection = mysql.createConnection({
    host: process.env.DBHOST || "localhost", 
    user: process.env.DBUSER || "root",
    password: process.env.DBPASSWORD || "root",
    port: process.env.port || 5001,
    database: process.env.DB || "burgers_db",
    multipleStatements: true
  });
}

// CREATE CONNECTION 
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// EXPORT CONNECTION FOR ORM TO USE
module.exports = connection;