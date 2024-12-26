const { Pool } = require('pg');

const pool = new Pool({
  user: 'yourUsername',
  host: 'yourHost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');
  } catch (err) {
    console.error('Error connecting to PostgreSQL', err);
  }
};

module.exports = connectDB;