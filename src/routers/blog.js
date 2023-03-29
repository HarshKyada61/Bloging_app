import express from 'express';
import auth from '../middleware/auth.js';
import Blog from '../models/blog.js';

const router = new express.Router()

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

router.get('/blog', async(req, res) => {
    const blog = await Blog.find()
    try{
        res.status(201).send(blog)
    }
    catch(e){
        res.status(400).send(e)
    }
})

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
        res.send({blog, Comments:blog.comments})
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch('/blog/:id',auth, async (req, res) => {
    const _id = req.params.id
    // const updates = Object.keys(req.body)
    
    try{
        const blog = await Blog.findOneAndUpdate({_id, user:req.user._id}, {...req.body},{new: true})

        if(!blog){
            return res.status(404).send("Can not find blog");
        }
        await blog.save()
        res.send(blog)
        
    }catch(e){
        res.status(400).send(e)
    }
})

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




export default router;