// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.x5apesq.mongodb.net/${process.env.mongodb_database_key}?retryWrites=true&w=majority`

// let _db

// const mongoConnect = (callback) => {
//   MongoClient.connect(connectionString)
//     .then((client) => {
//       console.log("connected")
//       _db = client.db()
//       callback()
//     })
//     .catch((err) => {
//       console.log(err)
//       throw err
//     })
// }
// const getDb = ()=>{
//   if (_db) {
//     return _db
//   }
//   throw "No Database Found!!"
// }


// exports.mongoConnect = mongoConnect
// exports.getDb = getDb
