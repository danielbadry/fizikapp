var d = new Date();
function z(n){
  return (n<10?'0':'') + n;
}
var dd = function()
{
  return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
  z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
  z(d.getMinutes()) + ':' + z(d.getSeconds());
};

const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
mongo.connect(url, {
  // useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    console.error(err);
    return;
  } else {
    const db = client.db('fizikapp');
    const messages = db.collection('messages');
    // iterate over all users
    db.collection('users').find({}).toArray((err, result) => {
      if (err) {
        throw err;
      }

      for (user of result) {
        let target = user;
        db.collection('shops').find({
          userId: user._id.toString()
        }).toArray((_err, result) => {
          if (result.length === 1) {
            var current = new Date();
            var registerDate = new Date(user.createdAt);
            var followingDay = registerDate.setDate(registerDate.getDate() + 1);
            let flag = current < followingDay;
            if (flag) {
              messages.insertOne({
                message: 'هم اکنون میتوانید از تخفیف 50 درصدی استفاده کنید',
                userId : target._id.toString(),
                isRead : false,
                isDeleted: false,
                createdAt: dd(),
                updatedAt: dd()
              }, (err, resultt) => {
                if (err) {
                  console.info('error:', err);
                } else {
                  console.info('successfully inserted');
                }
              });
            } else {
              console.info('dir shode');
            }
          }
        });

      }
    });

  }


});
