import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    }
},{
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment;