const express = require('express')
const app = express()
const {pool} = require('./models/config')
const cors = require('cors')
user = require('./routes/user')
beneficiary = require('./routes/beneficiary')
loan = require('./routes/loan')


//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))//allows to access form data
app.use('/user',user)
app.use('/beneficiary',beneficiary)
app.use('/loan',loan)

//show all users
app.get('/getusers',async(req,res)=>{
    const allusers = await(pool.query("SELECT * FROM users"))
    res.json(allusers.rows)
})

app.listen(4000,()=>console.log("listening to 4000..."))

//

