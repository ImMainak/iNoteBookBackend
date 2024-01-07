/*requiring ORM*/
const mongoose = require('mongoose');
require('dotenv').config();
let moment = require('moment');

const connectToMongo = () => {
  mongoose.connect(process.env.HOST_URL)
  .then(() => { console.log('Connection to DB has been established successfully.', new Date(), moment()); })
  .catch(err => { console.error('Unable to connect to the database:', err); });
}

connectToMongo();

module.exports.connectToMongo = connectToMongo;

/*testing connection for DB*/