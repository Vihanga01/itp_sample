const mongoose = require('mongoose');
//use for encrypt password
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    first_name : {
        type : String,
        required : true
    },

    last_name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },    
    
    phone : {
        type : Number,
        required : true
    },
    username:{
        type:String,
        required:true,
        min : 6,
        max : 15
    },
    
    password : {
        type : String,
        enum : ['user' , 'admin'],
        required : true
    }

});

//check password is dcrypted before save password
customerSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
        return next(err);
        this.password = passwordHash;
        next();
    });

});

customerSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
            
        else{
            if(!isMatch)
                return cb(null,isMatch);
            
            return cb(null,this);

        }

    });
}
//
const Customer = mongoose.model("Customer",customerSchema);

module.exports = Customer;