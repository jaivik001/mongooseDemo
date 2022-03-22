let mongoose = require('mongoose');

require('dotenv').config();

mongoose.Promise = global.Promise;
let uri = 'mongodb://' + process.env.HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.DB_NAME ;

let connectMongoose = function(){
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Error...', err);
        process.exit();
    });
}
connectMongoose();


//Error handler
mongoose.connection.on('error', function(err) {
  console.log(err);
});

mongoose.connection.on('open', function() {
  //helper.importAllModels();
});

// Reconnect when closed
mongoose.connection.on('disconnected', function() {
  setTimeout(function() {
    connectMongoose();
  }, 1000);
});

let helper = {
  importAllModels: function() {
    // body...
    require('../Modules/User/bootstrap');
  }   
};
helper.importAllModels();