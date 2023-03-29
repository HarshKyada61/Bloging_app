import express from 'express';
import auth from '../middleware/auth.js';
import Comment from '../models/comment.js'

const router = express.Router();

router.post('/comment', auth, async (req, res) => {
    const comment = new Comment({ 
        ...req.body,
        user:req.user._id
    })
    try{
        await comment.save()
        res.status(201).send(comment)
    }catch(e){
        res.status(400).send(e)
    }
})

// router.get('/comments', async (req, res) => {
//     const commnet = await Comment.find()
//     try{
//         res.status(201).send(commnet)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }
// })

router.delete('/comment/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try{
        const comment = await Comment.findOneAndDelete({_id,user:req.user._id})
        if(!comment){
            res.status(404).send('comment not found!')
        }

        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

export default router;