const {Pool} = require('pg')
const connectionString = "postgresql://postgres:pls opeen@localhost:5432/bankingsystem"

const pool = new Pool({connectionString:connectionString})

module.exports = {pool}
