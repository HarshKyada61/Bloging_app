import express from 'express';
import auth from '../middleware/auth.js';
import Blog from '../models/blog.js';

const router = new express.Router()


//add a blog
router.post('/blog', auth, async (req, res) => {
    const blog = new Blog({
        ...req.body,
        user: req.user._id 
    })

    try{
        await blog.save()
        res.status(201).send(blog)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//get all blogs
router.get('/blog', async(req, res) => {
    const blog = await Blog.find()
    try{
        res.status(201).send(blog)
    }
    catch(e){
        res.status(400).send(e)
    }
})


//show specific blog
router.get('/blog/:id', async (req, res) => {
    const _id = req.params.id
    
    try{
        const blog = await Blog.findOne({_id}) 
        if(!blog){
            res.status(404).send()
        }
        await blog.populate({
            path:'comments'
        })
        res.send({blog, comments:blog.comments})
    }catch(e){
        res.status(500).send(e)
    }
})

//update your own blog
router.patch('/blog/:id',auth, async (req, res) => {
    const _id = req.params.id
    // const updates = Object.keys(req.body)
    
    try{
        const blog = await Blog.findOneAndUpdate({_id, user:req.user._id}, {...req.body},{new: true})

        if(!blog){
            return res.status(404).send("Can not find blog");
        }
        await blog.save()
        res.status(200).send(blog)
        
    }catch(e){
        res.status(400).send(e)
    }
})


//delete your own blog
router.delete('/blog/:id',auth, async (req, res) => {
    const _id = req.params.id
    try{
        const blog = await Blog.findOneAndDelete({_id,user:req.user._id})
        if(!blog){
            res.status(404).send("can't find Blog")
        }

        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.delete('/blogs',auth, async (req, res) => {
    const _id = req.params.id
    try{
        const blog = await Blog.deleteMany({user:req.user._id})
        if(!blog){
            res.status(404).send("can't find Blog")
        }

        res.send("deleted all blogs")
    }
    catch(e){
        res.status(500).send(e)
    }
})






export default router;