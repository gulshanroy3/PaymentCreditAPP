var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

class Database {

    constructor() {

    }
    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, function (err, db) {
                if (err) reject(err);

                var dbo = db.db("IVoyant");
                resolve(dbo)
            })

        })
    }
}
module.exports = Database;