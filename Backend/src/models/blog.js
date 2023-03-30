import mongoose from 'mongoose'

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

blogSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'blog'
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog;