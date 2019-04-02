const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'bookCollection'



class bookCollection {

  static create(req, res) {
    let client = new MongoClient(url, { useNewUrlParser: true })
    client.connect()
    .then(()=> {
      const db = client.db(dbName)
      const collection = db.collection('books')
      return  collection.insertOne(req.body)
    })
    .then((books) => {
      res.status(201).json(books)
      client.close()
    })
    .catch(err => {
      res.status(400).json(err.message)
      client.close()
    })
  }

  static findAllBooks(req, res) {
    let client = new MongoClient(url, { useNewUrlParser: true })
    client.connect()
      .then(() => {
        const db = client.db(dbName)
        const collection = db.collection('books')
        return collection.find({}).toArray()
      })
      .then((books) => {
        res.status(200).json(books)
        client.close()
      })
      .catch(err => {
        res.status(400).json(err.message)
        client.close()
      })
  }

  static findOneBook(req, res) {
    let client = new MongoClient(url, { useNewUrlParser: true })
    client.connect()
      .then(() => {
        const db = client.db(dbName)
        const collection = db.collection('books')
        return collection.findOne({"isbn":req.params.isbn})
      })
      .then((books) => {
        res.status(200).json(books)
        client.close()
      })
      .catch(err => {
        res.status(400).json(err.message)
        client.close()
      })
  }

  static update(req, res) {
    let client = new MongoClient(url, { useNewUrlParser: true })
    client.connect()
      .then(()=> {
        const db = client.db(dbName)
        const collection = db.collection('books')
        return collection.update({isbn:req.params.isbn},{ $set :req.body})
      })
      .then( book => {
        res.status(201).json(book)
        client.close()
      })
      .catch(err => {
        res.status(400).json(err.message)
        client.close()
      })
  }


  static remove(req, res) {
    let client = new MongoClient(url, { useNewUrlParser: true })
    client.connect()
      .then(()=> {
        const db = client.db(dbName)
        const collection = db.collection('books')
        return collection.deleteOne({isbn:req.params.isbn})
      })
      .then((book)=> {
        res.status(200).json(book)
        client.close()
      })
      .catch(err => {
        res.status(400).json(err.message)
        client.close()
      })
  }
}


module.exports = bookCollection