const router = require('express').Router();
const contact = require('../models/contact');
// router.post('/contact', (req, res) => {
router.post('/post',async (req, res) => {
    try{
const {
    name,
    number,
    address,
    state,
    city ,
} = req.body;
const newcontact = new contact({name,number,address,state,city ,});
await newcontact.save().then(() => {
    res.status(200).json({message:"Data added"});
},
()=>{
    res.status(400).json({message:"Data not saved"});
});
}catch(error){
res.status(400).json({message:"something went wrong"});
    }
})


router.get('/getuser', async (req, res) => {
    try {
        const data = await contact.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error });
    }
})

router.get('/getSingleUser/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const data = await contact.find({ name: name });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error });
    }
})

router.patch('/updateUser/:id', async (req, res) => {
    try {
        const { id} = req.params;
        const {  name,number, address, state, city } = req.body;
        const data = await contact.findOneAndUpdate({ _id: id}, req.body, { new: true });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error });
    }
})

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id} = req.params;
        const data = await contact.findOneAndDelete({ _id: id });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error });
    }
})

module.exports = router;


// after this go on application.js below