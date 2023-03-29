import express from 'express'
import auth from '../middleware/auth.js';
import User from '../models/user.js';

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save();
        const token = await user.generateToken()
        res.status(201).send({user,token});
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send("logout successfully.")
    }catch(e){
        res.status(500).send()
    }
})

router.post('/user/logoutAll', auth, async(req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save()

        res.send("succesfully Logout from all devices.")
    }catch(e){
        res.status(500).send()
    }
})

// router.get('/user/me', auth, async (req, res) => {
//     res.send(req.user)
// })

router.get('/user/me', auth, async (req, res) => {
    const user = req.user;
    try {
        await req.user.populate({
            path:'blogs'
        })
        res.status(200).send({user, blog:req.user.blogs})
    }catch(e){
        res.status(500).send
    }
})

// router.get('/users', async(req,res) => {
//     const user = await User.find()

//     try{
//         res.status(201).send(user)
//     }
//     catch(e){
//         res.status(400).send(e);
//     }
// })

// router.get('/user/:id', async (req, res) => {
//     const _id = req.params.id
    
//     try{
//         const user = await User.findOne({
//             _id
//         }) 
//         if(!user){
//             res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })


router.patch('/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try{
        
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save()
        res.send(req.user)
        
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/user/me', auth, async (req, res) => {
    try{
        
        await User.findByIdAndDelete(req.user._id)

        res.send("deleted successfully")
    }
    catch(e){
        res.status(500).send(e)
    }
})

export default router;