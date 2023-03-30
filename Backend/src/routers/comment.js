import express from 'express';
import auth from '../middleware/auth.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js'

const router = express.Router();

//create comment
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


//only owner of comment or owner of blog can delete comment
router.delete('/comment/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try{

        const comment = await Comment.findOne({_id})
        if(!comment){
            res.status(404).send('comment not found!')
        }
        const blog = await Blog.findOne({_id:comment.blog});

        if(comment.user == req.user.id || blog.user == req.user.id){
            await Comment.findByIdAndDelete(_id);
        }else{
            res.send("You are not allowed to delete this comment!")
        }

        res.send("Deleted Successfully")
    }
    catch(e){
        res.status(500).send(e)
    }
})

export default router;