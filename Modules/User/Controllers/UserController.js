let responseHandler = require('../../../Utils/ResponseHandler');
let constants = require('../../../Utils/ModelConstants')
let stringConstants = require('../../../Utils/StringContants');
let mongoose  = require('mongoose');
let bcrypt = require('bcrypt')

//Model

let UserModel = mongoose.model(constants.UserModel);
// indexing remove
// UserModel.collection.dropIndexes().then(data => {
//     console.log('indexing deleted.' , data);
// });

let User = {
    signup: async(req , res , next) => {
        let input = req.body;
        try {
            let user = await UserModel.findOne({email: input.email.toLowerCase()}) 
            if(user){
                responseHandler.sendSuccess(res , " " , stringConstants.UserAlreadyExist);
            }else{
                let userModel = new UserModel;
                userModel.firstname = input.firstname;
                userModel.lastname = input.lastname;
                userModel.email = input.email;
                userModel.password = bcrypt.hashSync(input.password , 8);
                userModel.gender = input.gender;
                userModel.child.push({address : input.address , city: input.city , state: input.state , country: input.country});
                
                userModel.save().then(data => {
                    //console.log(data)
                    responseHandler.sendSuccess(res, data )
                }).catch(err => {
                    //console.log(err)
                    responseHandler.sendInternalServerError(res , '' , err);
                })      
            }   
        }catch(err){
            responseHandler.sendInternalServerError(res , err , err.name);
        }
        
    },
    allUser:async(req ,res) =>{
        try {
            let users = await UserModel.find()
            responseHandler.sendSuccess(res , users );
        } catch (err) {
            responseHandler.sendInternalServerError(res , '' , err);
        }
    },
    findById: async(req ,res) =>{
        let input = req.body;
        try {
            let user= await UserModel.findById(input.id)
            if(user){
                responseHandler.sendSuccess(res , user );
            }else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }catch (err) {
            responseHandler.sendInternalServerError(res , '' , err.name);
        
        }
    },
    findByIdAndDelete: async(req, res , next) =>{
        let input = await req.body;
        try{
            let user = await UserModel.findByIdAndDelete({_id: input.id});   
            //console.log(user)
            if(user){
                console.log('user deleted');
                responseHandler.sendSuccess(res , ' User Deleted Successfully' );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err.name);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    },
    findByIdAndRemove: async(req, res , next) =>{
        let input = await req.body;
        console.log(input);
        try{
            let user = await UserModel.findByIdAndRemove({_id:input.id});   
            //console.log(user)
            if(user){
                console.log('user removed');
                responseHandler.sendSuccess(res , ' User Removed Successfully' );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err.name);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    }, 
    findByIdAndUpdate: async(req, res , next) =>{
        let input = await req.body;
        console.log(input);
        try{
            let user = await UserModel.findByIdAndUpdate({_id:input.id} , { firstname: input.firstname , lastname: input.lastname , email: input.email , password: input.password , gender: input.gender} , { new:true , rawResult:true });   
            //console.log(user)
            if(user){
                console.log('user removed');
                responseHandler.sendSuccess(res , user );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err.name);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    },
    findOne: async(req ,res) =>{
        let input = req.body;
        try {
            let user= await UserModel.findOne({email: input.email})
            //console.log(user);
            if(user){
                responseHandler.sendSuccess(res , user );
            }else{
                responseHandler.sendSuccess(res , '' , 'USER does not exit' );
            }
        }catch (err) {
            responseHandler.sendInternalServerError(res , '' , err.name);
        
        }
    },
    findOneAndDelete: async(req ,res) =>{
        let input = req.body;
        try {
            let user= await UserModel.findOneAndDelete({email: input.email})
            //console.log(user);
            if(user){
                console.log("user deleted");
                responseHandler.sendSuccess(res , 'User deleted Successfully' );
            }else{
                responseHandler.sendSuccess(res , '' , 'USER does not exit' );
            }
        }catch (err) {
            responseHandler.sendInternalServerError(res , '' , err.name);
        
        }
    },
    findOneAndRemove: async(req, res , next) =>{
        let input = await req.body;
        console.log(input);
        try{
            let user = await UserModel.findOneAndRemove({ email: input.email });   
            //console.log(user)
            if(user){
                console.log('user removed');
                responseHandler.sendSuccess(res , ' User Removed Successfully' );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err.name);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    }, 
    findOneAndReplace: async(req, res , next) =>{
        let input = await req.body;
        console.log(input);
        try{
            let user = await UserModel.findOneAndReplace({_id:input.id} , { firstname: input.firstname , lastname: input.lastname , email: input.email , password: input.password , gender: input.gender} , { new:true } );   
            console.log(user)
            if(user){
                console.log('user replaced');
                responseHandler.sendSuccess(res , user );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err.name);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    },
    findOneAndUpdate: async(req, res , next) =>{
        let input = await req.body;
        console.log(input);
        try{
            let user = await UserModel.findOneAndUpdate({_id:input.id} , { firstname: input.firstname , lastname: input.lastname , email: input.email , password: input.password , gender: input.gender}, { new:true });   
            //console.log(user)
            if(user){
                console.log('user Updated');
                responseHandler.sendSuccess(res , 'User Updated' );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err.name);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    },
    replaceOne: async(req, res , next) =>{
        let input = await req.body;
        console.log(input);
        try{
            let user = await UserModel.replaceOne({_id:input.id} , { firstname: input.firstname , lastname: input.lastname , email: input.email , password: input.password , gender: input.gender} , { new:true });   
            console.log(user)
            if(user){
                console.log('User value replaced');
                responseHandler.sendSuccess(res , 'User value replaced' );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err.name);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    },
    deleteMany: async(req ,res) =>{
        let input = req.body;
        try {
            let users= await UserModel.deleteMany({ gender: input.gender })
            //console.log(user);
            if(users){
                console.log(user.deletedCount+" users deleted");
                responseHandler.sendSuccess(res , users.deletedCount+' Users deleted Successfully' );
            }else{
                responseHandler.sendSuccess(res , '' , 'USERS does not exit' );
            }
        }catch (err) {
            responseHandler.sendInternalServerError(res , '' , err.name);
        
        }
    },
    deleteOne: async(req ,res) =>{
        let input = req.body;
        try {
            let user = await UserModel.deleteOne({ gender: input.gender })
            //console.log(user);
            if(user){
                console.log("user deleted");
                responseHandler.sendSuccess(res ,'User deleted Successfully' );
            }else{
                responseHandler.sendSuccess(res , '' , 'USER does not exit' );
            }
        }catch (err) {
            responseHandler.sendInternalServerError(res , '' , err.name);
        
        }
    },
    updateOne: async(req, res , next) =>{
        let input = await req.body;
        console.log(input);
        try{
            let user = await UserModel.updateOne({_id:input.id} , { firstname: input.firstname , lastname: input.lastname , email: input.email , password: input.password , gender: input.gender} ,{ new:true } );   
            console.log(user)
            if(user){
                console.log('user Updated');
                responseHandler.sendSuccess(res , 'User Updated' );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err.name);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    },
    updateMany: async(req, res , next) =>{
        let input = await req.body;
        //console.log(input);
        try{
            let users = await UserModel.updateMany({ gender:input.gender } , { firstname: input.firstname , lastname: input.lastname , email: input.email , password: input.password , gender: input.gender}, { new:true });   
            //console.log(users)
            if(users){
                console.log(users.modifiedCount+' user Updated');
                responseHandler.sendSuccess(res , users.modifiedCount+' User Updated' );
            }
            else{
                responseHandler.sendSuccess(res , '' , 'Id does not exit' );
            }
        }
        catch(err){
            console.log("In catch" ,err);
            responseHandler.sendInternalServerError(res , '' , err.name);
        }
    },
    pagination: async(req ,res) =>{
        let input = req.body;
        console.log(input.limit);
        try {
            let page = input.page || 1;
            let limitValue = input.limit || 10;
            let skipValue = limitValue*(page-1);
            let users = await UserModel.find().limit(limitValue).skip(skipValue);
            //console.log(users);
            if(users.length != 0){
               responseHandler.sendSuccess(res , {"page": page , "perpage":limitValue , users} );
            }else{
               responseHandler.sendSuccess(res , " ", "User Data not found" );
            }
        } catch (err) {
            responseHandler.sendInternalServerError(res , '' , err);
        }
    }, 

}
module.exports = User;