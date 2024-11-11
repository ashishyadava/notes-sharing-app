// testConnection.js
const pool = require('./db/pool');

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful:', res.rows[0]);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await pool.end(); // close the pool
  }
}

testConnection();
