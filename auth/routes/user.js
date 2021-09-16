const express = require("express")
const router = express.Router()
const {pool} = require('../models/config')
const bcrypt = require('bcrypt')



router.post('/register',async(req,res)=>{
    try {
        const {name,email,password} = req.body
        var checkIfexist = email
        let hashedPassword = await bcrypt.hash(password,10)
        console.log(hashedPassword)
        const adduser = await(pool.query("INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",[name,email,hashedPassword]))
        console.log("registered")
        res.json("registered")
    } catch (err) {
        console.error(err.message)
        pool.query("SELECT * FROM users WHERE email = $1",[checkIfexist],(err,results)=>{
            if(results.rows.length>0){
                res.json("err")
            }
        })  
    }   
})

router.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body 
        const user = await(pool.query("SELECT * FROM users WHERE email = $1",[email]))
        const user_obj = user.rows[0]
        bcrypt.compare(password, user_obj.password, (err,isMatch)=>{
        if(err){
            throw err
        }
        if(isMatch){
            res.json(user.rows[0])
        }
        else{
            res.json("rejected")
            console.log('Login failed')
        }})    
    }    
    catch (err) {
        console.error(err.message)
    }
})

router.get('/balance/:email',async(req,res)=>{
    try {
        const useremail = req.params.email
        const balance = await pool.query('SELECT balance FROM users WHERE email=$1',[useremail])
        res.json(balance.rows[0])
    } catch (err) {
        console.error(err.message)
        
    }
})

router.get('/history/:email',async(req,res)=>{
    try {
        const user_email = req.params.email
        const accno_ = await pool.query('SELECT id FROM users WHERE email = $1',[user_email])
        const history = await pool.query('SELECT * FROM users JOIN transactions ON sender = users.id where sender = $1 OR receiver = $2 ORDER BY time DESC',[accno_.rows[0].id,accno_.rows[0].id])
        
        res.json(history.rows)
        console.log(history.rows)

    } catch (err) {
        console.error(err.message)
    }
})

router.put('/quicktransfer',async(req,res)=>{
    try {
        const receiver_accno = req.body.accno
        const sender_email = req.body.sender_email 
        const sender_accno_ = await pool.query('SELECT id FROM users WHERE email = $1',[sender_email])

        const accno_sliced = Number(String(receiver_accno).substring(7))
        const amount = req.body.amount
        const curBal = await pool.query('SELECT balance FROM users WHERE email = $1',[sender_email])
        if(amount<5000 && curBal.rows[0].balance > amount){
        const transferData = await pool.query('UPDATE users SET balance = balance+$1 WHERE id = $2 ',[amount,accno_sliced])
        const updateData = await pool.query('UPDATE users SET balance = balance-$1 WHERE email = $2 ',[amount,sender_email])
        //add to transaction table
        //get receiver name
        const receiver_name = await pool.query('SELECT name FROM users WHERE id=$1',[accno_sliced])
        const receiver_name_ = receiver_name.rows[0].name
        await pool.query('INSERT INTO transactions (sender,receiver,amount,receiver_name,date,time) VALUES($1,$2,$3,$4,NOW(),NOW())',[sender_accno_.rows[0].id, accno_sliced, amount, receiver_name_])
        res.json("transaction success")    
    }
        else{
            res.json("you're broke")
        }
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router