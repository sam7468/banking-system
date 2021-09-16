const express = require("express")
const router = express.Router()
const {pool} = require('../models/config')

router.post('/status' , async(req,res)=>{
    try {
        const email = req.body.email 
        console.log(email)
        const response = await(pool.query('SELECT * FROM LOANS WHERE email = $1',[email]))
        res.json(response.rows[0])
        console.log("from status==>",response.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})


router.post('/submitform',async(req,res)=>{
    try {
        const {f_name,l_name,email,city,dob,mobile,job,salary,amount,pincode,loantype} = req.body.formdata
        console.log(req.body)
        console.log("-->")
        await(pool.query("INSERT INTO loans(f_name,l_name,email,city,dob,mobile,job,salary,loan_amount,pincode,loantype) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",[f_name,l_name,email,city,dob,mobile,job,salary,amount,pincode,loantype]))
    }
    catch (err) {
        console.error(err.message)
    }
})

module.exports = router
