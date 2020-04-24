const mongoose = require('mongoose');

require('dotenv').config();

module.exports = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(`MongoDB's Connected!`);
}).catch(err => {
    console.log(`An error ocurred! \n ${err}`);
});