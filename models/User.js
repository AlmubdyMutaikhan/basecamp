const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : [ true, "Baurym, email zhazsai, po bratski"]
    },
    password : {
        type : String,
        required : [ true, "Ey, aynalayin, creat a password"],
        minlength : [5, "Password length should be more than 5"]
    },
    name : {
        type : String,
        minlength : [2, "Ahahhaaha, good joke! "]
    },
    is_user : {
        type : Boolean,
        default : true
    },
    is_admin : {
        type : Boolean,
        default : false
    },
    projects : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    }]
}) 

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(5)
    this.password = await bcrypt.hash(this.password, salt)
    this.name = this._id
    next()
})

UserSchema.statics.login = async function({ email, password }) {
    const user = await this.findOne({ email })
    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user
        } else {
            throw new Error('incorrect password');
        }
    }
    throw new Error('incorrect email');
}


const User = mongoose.model('User', UserSchema)
module.exports = { User }
