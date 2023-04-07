import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import Blog from './blog.js';
import Comment from './comment.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,    
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
},{
    timestamps: true
}) 

userSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'user'
})

//send filtered data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.createdAt
    delete userObject.updatedAt
    delete userObject.__v

    return userObject
}

//generate authentication token
userSchema.methods.generateToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, "hrkyada");

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}

//match user
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Wrong Email")
    }

    if(!(password === user.password)){
        throw new Error('Wrong Password')
    }
    
    return user

}

userSchema.pre('findOneAndDelete', async function (next) {
    console.log("somethinfgdbfgsdfbn");
    const user = this._conditions
    console.log(user);
    await Blog.deleteMany({ user: user._id })
    await Comment.deleteMany({user: user._id})
    console.log("something");    
    next()
})

const User =  mongoose.model('User', userSchema)

export default User;