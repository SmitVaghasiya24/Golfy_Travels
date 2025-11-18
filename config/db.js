import mysql from 'mysql2/promise'; 

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Smit@2025',
  database: 'golfy_travel',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


export default pool;