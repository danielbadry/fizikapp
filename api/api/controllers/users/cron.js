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
    const messages = db.collection('messages');
    // iterate over all users
    db.collection('users').find({}).toArray((err, result) => {
      if (err) {
        throw err;
      }

      for (user of result) {
        db.collection('shops').find({
          userId: user._id.toString()
        }).toArray((_err, result) => {
          if (result.length === 1) {
            var current = new Date();
            var registerDate = new Date(user.createdAt);
            var followingDay = registerDate.setDate(registerDate.getDate() + 1);
            if (current <= followingDay) {
              messages.insertOne({
                message: 'Roger',
                userId : user._id,
                isRead : false,
                isDeleted: false
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
    // const messages = db.collection('messages');
    // const users = db.collection('users');
    // const shops = db.collection('shops');

    // let allUsers = users.find({
    //   '_id' : '5e1f32754be75b028cbacf1e'
    // });
    // console.info('allUsers:', allUsers);
    // for (user of allUsers) {
    //   let result = shops.find({
    //     userId : user._id,
    //   });

    //   if (result.length === 1) {
    //     // calculate register date
    //     var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
    //     var followingDay = new Date(user.createdAt.getTime() + 86400000); // + 1 day in ms
    //     console.info('followingDay:', followingDay);
    //   }
    // }

  }


});
