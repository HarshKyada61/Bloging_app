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
}) 

const Blog = mongoose.model('Blog', blogSchema)

export default Blog;