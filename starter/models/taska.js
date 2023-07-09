const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:[true,'Must Provide Name'],
        trim:true,
        maxlength:[20,'Name can not be more than 20 characters']
    },
    password:{
        type:String,
        required:[true,'Must Provide Name'],
        trim:true,
        maxlength:[20,'Name can not be more than 20 characters']
    },
    
})
module.exports = mongoose.model('Users', UserSchema)