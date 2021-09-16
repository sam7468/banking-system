const express = require("express")
const router = express.Router()
const {pool} = require('../models/config')


router.put('/transfertoBeneficiary',async(req,res)=>{
    try {
        const receiver_accno = req.body.accno
        const sender_email = req.body.sender_email 
        const sender_accno_ = await pool.query('SELECT id FROM users WHERE email = $1',[sender_email])
        
        const accno_sliced = Number(String(receiver_accno).substring(7))
        const amount = req.body.amount
        const curBal = await pool.query('SELECT balance FROM users WHERE email = $1',[sender_email])
        if(amount < 100000 && curBal.rows[0].balance>amount){
        const transferData = await pool.query('UPDATE users SET balance = balance+$1 WHERE id = $2 ',[amount,accno_sliced])
        const updateData = await pool.query('UPDATE users SET balance = balance-$1 WHERE email = $2 ',[amount,sender_email])
        res.json("transaction success")
        //add to transaction table
        const receiver_name = await pool.query('SELECT name FROM users WHERE id=$1',[accno_sliced])
        const receiver_name_ = receiver_name.rows[0].name
        await pool.query('INSERT INTO transactions (sender,receiver,amount,receiver_name,date,time) VALUES($1,$2,$3,$4,NOW(),NOW())',[sender_accno_.rows[0].id, accno_sliced, amount, receiver_name_])
    }
        else{
            res.json("you're broke")
        }

    } catch (err) {
        console.error(err.message)
    }
})

router.post('/addbeneficiary',async(req,res)=>{
    try {
        const {name,email,accno} = req.body
        const addbeneficiary = await(pool.query("INSERT INTO beneficiary(name,email,accno) VALUES($1,$2,$3) RETURNING *",[name,email,accno]))
        res.json("beneficiary added")
    } catch (err) {
        console.error(err.message)
    }   
})

router.delete('/deletebeneficiary/:accno',async(req,res)=>{
    try {
        const accno = req.params.accno
        console.log(accno)
        await pool.query("DELETE FROM beneficiary WHERE accno = $1",[Number(accno)])
    } catch (err) {
        console.error(err.message)
    }
})


router.get('/getbeneficiary/:email',async(req,res)=>{
    try {
        const email = req.params.email
        const temp_accno = await pool.query('SELECT id FROM users WHERE email=$1',[email])
        const accno = Number("1357000"+temp_accno.rows[0].id)
        res.json(accno)
        
    } catch (err) {
        console.error(err.message)    
    }
})

//for dropdown list
router.get('/getallbeneficiary',async(req,res)=>{
    try {
        const allbenificiary = await pool.query('SELECT * FROM beneficiary')
        res.json(allbenificiary.rows)
        
    } catch (err) {
        console.error(err.message)    
    }
})


module.exports = router
