let UserController = require('./Controllers/UserController');

module.exports = function(router){
    router.post('/signup' , UserController.signup);
    router.get('/users' , UserController.allUser);
    router.get('/id' , UserController.findById);
    router.delete('/findByIdAndDelete' , UserController.findByIdAndDelete );
    router.post('/findByIdAndRemove' , UserController.findByIdAndRemove );
    router.patch('/findByIdAndUpdate' , UserController.findByIdAndUpdate );
    router.get('/findOne' , UserController.findOne );
    router.delete('/findOneAndDelete' , UserController.findOneAndDelete );
    router.post('/findOneAndRemove' , UserController.findOneAndRemove );
    router.put('/findOneAndReplace' , UserController.findOneAndReplace );
    router.patch('/findOneAndUpdate' , UserController.findOneAndUpdate );
    router.put('/replaceOne' , UserController.replaceOne );
    router.delete('/deleteMany' , UserController.deleteMany );
    router.delete('/deleteOne' , UserController.deleteOne );
    router.patch('/updateOne' , UserController.updateOne );
    router.patch('/updateMany' , UserController.updateMany );
    router.get('/fetchUser' , UserController.pagination);
    


    













}