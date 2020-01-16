const mongoose = require('mongoose');

const password = encodeURIComponent('tomanino1')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tomanino:'+password+'ds263848.mlab.com:63848/heroku_rtll63l1', { 
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
if (!(process.env.NODE_ENV === 'production')) {
    mongoose.set('debug', true);
}

module.exports = {mongoose};