import express from 'express'
import User from '../models/user.js';

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save();
        res.status(201).send(user);
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/users', async(req,res) => {
    const user = await User.find()

    try{
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    
    try{
        const user = await User.findOne({
            _id
        }) 
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch('/user/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email','password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    
    try{
        const user = await User.findOne({
            _id
        }) 
        if(!user){
            res.status(404).send()
        }
        
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save()
        res.send(user)
        
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/user/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const user = await User.findOneAndDelete({_id})
        if(!user){
            res.status(404).send()
        }

        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

export default router;