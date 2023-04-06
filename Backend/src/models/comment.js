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


commentSchema.methods.toJSON = function () {
    const comment = this
    const commentObject = comment.toObject()

    delete commentObject.user
    delete commentObject.blog
    delete commentObject.createdAt
    delete commentObject.updatedAt
    delete commentObject.__v

    return commentObject
}
const Comment = mongoose.model('Comment', commentSchema)

export default Comment;