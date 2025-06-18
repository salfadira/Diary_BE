
const { Pool } = require("pg");

// Gunakan DATABASE_URL dari Heroku
const pool = new Pool({
  connectionString: "postgres://uamvdma0daivr6:pe6873563dbd7fe48cf090724f2c5b8d4380188877d6386daa264b69365191dec@cer3tutrbi7n1t.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d9d57ie4u2jqhi"
,
  ssl: {
    rejectUnauthorized: false, // penting untuk koneksi ke Heroku
  },
});

// Test koneksi database
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection error:", err.stack);
  } else {
    console.log("✅ Connected to Heroku PostgreSQL database.");
    release();
  }
});

module.exports = pool;
