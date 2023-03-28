import express from 'express';
import Blog from '../models/blog.js';

const router = new express.Router()

router.post('/blog', async (req, res) => {
    const blog = new Blog(req.body)

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
        const blog = await Blog.findOne({
            _id
        }) 
        if(!blog){
            res.status(404).send()
        }
        res.send(blog)
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch('/blog/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Title', 'Body']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    
    try{
        const blog = await Blog.findOne({
            _id
        }) 
        if(!blog){
            res.status(404).send()
        }
        
        updates.forEach((update) => blog[update] = req.body[update]);
        await blog.save()
        res.send(blog)
        
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/blog/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const blog = await Blog.findOneAndDelete({_id})
        if(!blog){
            res.status(404).send()
        }

        res.send(blog)
    }
    catch(e){
        res.status(500).send(e)
    }
})




export default router;