const Pool = require("pg").Pool;
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database:"bookdb",
    password: "190119"
});
module.exports = pool;