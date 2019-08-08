const express = require ('express');

const db = require ('./data/dbConfig.js');

const router = express.Router();
// server.use('/accounts', AccountsRouter)

router.get('/', async (req, res)=> {
    try {
        // const accounts = await db ('accounts');
        const accounts = await db.select('*').from('accounts');
        res.status(200).json(accounts)
    }
    catch(err){
        res.status(500).json({error : 'error finding budget'})
    }
})

router.get('/:id', async(req,res)=> {
    const {id}= req.params;
    try{
        const [account]= await db('accounts').where({id});
        if(account){
        res.status(200).json(account);
    }else{
        res.status(404).json({message: `could not find account ${id}`})
    } 

    }catch(err){
        res.status(500).json({message: 'failed to find account.'})
    }
})

router.post('/', async(req,res)=>{
    const accData = req.body;
    try{
        const account = await db('accounts').insert(accData);
        res.status(201).json(account)
    }
    catch(err){
        res.status(500).json({message: 'could not add account.'})
    }
});

router.put('/:id', async(req,res)=>{
    const{id}=req.params;
    const changes = req.body;

    try{
        const count = await db('accounts').where('id','=', id).update(changes);
        if(count){
            res.status(200).json({updated: count});
        }else{
            res.status(404).json({message: 'could not find account.'})
        }
    }catch(err){
        res.status(500).json({message: 'could not update the account.'})
    }
});

router.delete('/:id', async (req, res) => {
    const {id}= req.params;

    try{
        const item = await db('accounts').where({id}).del();
        if(item){
            res.status(200).json({deleted: item});
        }else{
            res.status(500).json({message: `could not find ${id}`})
        }
    }catch(err){
        res.status(500).json({message: 'could not delete.'})
    }
})

const AccountsRouter = require ('./AccountsRouter')

module.exports = router;
