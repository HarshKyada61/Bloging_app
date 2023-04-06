import mongoose from 'mongoose'
import Comment from './comment.js'

const blogSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        trim: true
    },
    Body: {
        type:String,
        required: true,
        trim: true
    },
    Category: {
        type: String,
        required: true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
},{
    timestamps: true
}) 

blogSchema.methods.toJSON = function () {
    const blog = this
    const blogObject = blog.toObject()

    delete blogObject.user
    delete blogObject.createdAt
    delete blogObject.updatedAt
    delete blogObject.__v

    return blogObject
}

blogSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'blog'
})

blogSchema.pre('findOneAndDelete', async function (next) {
    const blog = this._conditions
    await Comment.deleteMany({blog: blog._id})
    next()
})

blogSchema.post('deleteMany', async function (doc) {
    console.log("somethinfgdbfgsdfbn");
    console.log(doc);
    // const blog = this._conditions
    
    // await Comment.deleteMany({blog: blog._id})
    // console.log("9fyuhdffgsdg");
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog;