const sqlite3 = require('sqlite3').verbose();

const DB_PATH = 'app.db'

const DB = new sqlite3.Database(DB_PATH);

DB.serialize(() => { 
    DB.run("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY UNIQUE, Name TEXT, Surname TEXT, Nick TEXT)");
})

module.exports = DB;