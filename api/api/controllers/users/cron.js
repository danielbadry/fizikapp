const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    console.error(err);
    return;
  } else {
    const db = client.db('fizikapp');
    const collection = db.collection('messages');
    collection.insertOne({
      message: 'Roger'
    }, (err, result) => {
      if (err) {
        console.info('error:', error);
      } else {
        console.info('successfully inserted');
      }
    });
  }

});
