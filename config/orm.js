var connection = require("./connection.js");

//object constructor for sql statement
class Orm{
    constructor(tableName){
        this.connection = connection;
        this.tableName = tableName;
    }
    
    selectAll(cb){
        // SELECT ALL FROM DATABASE
        var query = `SELECT * FROM ${this.tableName}`
        this.connection.query(query,(err,data)=>{
            if(err){
                throw err;
            }
            cb(data);
        });
    }

    insertOne(model, cb){
        // INSERT INTO DATABASE
        var keys=[];
        var values = [];
        Object.keys(model).forEach(x=>{
            keys.push(x);
            values.push(model[x]);
        });
        var questionMarks = keys.map(x => "?")
        var query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${questionMarks})`;
        
        this.connection.query(query,values,(err,data)=>{
            if (err){
                throw err;
            }
            cb(data);
        })

    }

    updateOne(model, cb){
        // COLUMN GETS UPDATED
        var columns = [];
        var values = [];
        var id;

        Object.keys(model).forEach(x=>{
            if(x === 'id'){
                id = model[x];
                return;
            }
            columns.push(`${x}=?`);
            values.push(model[x]);
        });
        values.push(id);
        var query = `UPDATE ${this.tableName} SET ${columns} WHERE id = ${id}`;
        
        this.connection.query(query, values, (err,data)=>{
            if(err){
                throw err;
            }
            cb(data);
        });
    }
}

module.exports = Orm;