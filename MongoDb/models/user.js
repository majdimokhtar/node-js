const getDb = require("../util/database").getDb
const mongoDb = require("mongodb")

class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }
  save() {
    const db = getDb()
    let dbOp
    if (this._id) {
      dbOp = db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOp = db.collection("users").insertOne(this)
    }

    return dbOp
      .then((result) => console.log(result))
      .catch((err) => console.log(err))
  }
  static findById(userId) {
    const db = getDb()
    return db
      .collection("users")
      .find({ _id: new mongoDb.ObjectId(userId) })
      .next()
      .then((user) => {
        console.log(user)
        return user
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = User
